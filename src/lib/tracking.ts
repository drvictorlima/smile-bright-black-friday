/**
 * Módulo de Rastreamento Avançado (Meta Pixel + CAPI n8n)
 * 
 * Regra:
 * - PageView é disparado no carregamento pelo Pixel do navegador.
 * - Purchase é disparado EXCLUSIVAMENTE quando o visitante escolhe realizar o procedimento nesta semana e clica para ir ao WhatsApp.
 * - Garante nota máxima de EMQ (Event Match Quality) enviando cookies _fbp, _fbc, IP, User-Agent, nome, whats, email e event_id para deduplicação.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const META_PIXEL_ID = "1866189184381180";
export const META_CAPI_WEBHOOK_URL = "https://acessodrvictorlima.app.n8n.cloud/webhook/meta-capi";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getFbp(): string | null {
  return getCookie("_fbp");
}

export function getFbc(): string | null {
  const cookieFbc = getCookie("_fbc");
  if (cookieFbc) return cookieFbc;

  if (typeof window !== "undefined" && window.location) {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  }
  return null;
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

export interface TrackLeadParams {
  nome: string;
  whats: string;
  email: string;
  unidade: string;
  lentes: string;
  price: number;
}

/**
 * Disparo duplo e deduplicado do evento de Purchase (Compra/WhatsApp)
 */
export function trackWhatsAppPurchase(params: TrackLeadParams): string {
  const eventId = generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);
  const fbp = getFbp();
  const fbc = getFbc();
  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://megadescontoblackfriday.com/";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

  // 1. Disparo no navegador via Meta Pixel com eventID
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Purchase",
      {
        value: params.price,
        currency: "BRL",
        content_name: `Até ${params.lentes} lentes em resina`,
        content_category: "Odontologia Estética",
        content_type: "product",
      },
      { eventID: eventId }
    );
  }

  // 2. Disparo para o servidor (CAPI via n8n Webhook) com keepalive
  const capiPayload = {
    event_name: "Purchase",
    event_id: eventId,
    event_time: eventTime,
    event_source_url: pageUrl,
    nome: params.nome,
    phone: params.whats,
    email: params.email,
    unidade: params.unidade,
    lentes: params.lentes,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
    client_user_agent: userAgent,
    custom_data: {
      value: params.price,
      currency: "BRL",
      content_name: `Até ${params.lentes} lentes em resina`,
      content_category: "Odontologia Estética",
    },
  };

  if (typeof fetch !== "undefined") {
    void fetch(META_CAPI_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(capiPayload),
      keepalive: true,
    }).catch((err) => {
      console.warn("Erro no envio em segundo plano para o webhook CAPI:", err);
    });
  }

  return eventId;
}
