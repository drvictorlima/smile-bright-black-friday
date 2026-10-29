import { z } from "zod";
import { OFFERS, currency, installmentText } from "@/lib/offers";

export const BLACK_FRIDAY_COUPON = "BLACKFRIDAY";

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Use até 100 caracteres no nome.")
    .regex(/^[\p{L}\p{M} '\-]+$/u, "Use somente letras no nome."),
  whats: z.string().trim().max(25).regex(/^[+\d\s().-]+$/, "Informe um WhatsApp válido com DDD.")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^(?:55)?[1-9]\d\d{8,9}$/.test(value), "Informe um WhatsApp válido com DDD."),
  email: z.string().trim().max(255).email("Informe um e-mail válido."),
  unidade: z.enum(["Tatuapé - SP", "Santos - SP", "Savassi - BH"], { message: "Selecione uma unidade." }),
  lentes: z.enum(["10", "20"], { message: "Escolha até 10 ou até 20 lentes." }),
  prazo: z.enum(["esta-semana", "data-futura"], { message: "Escolha quando deseja realizar o procedimento." }),
  ciente: z.literal("sim", { message: "Confirme que está ciente do valor e das condições da oferta." }),
});

export function leadDestination(prazo: z.infer<typeof leadSchema>["prazo"]) {
  return prazo === "esta-semana" ? "whatsapp" : "agradecimento";
}

export function whatsappUrl(input: unknown, phone: string) {
  const lead = leadSchema.parse(input);
  if (leadDestination(lead.prazo) !== "whatsapp") return null;
  if (!/^\d{10,15}$/.test(phone)) return null;
  const offer = lead.lentes === "10" ? OFFERS.ten : OFFERS.twenty;
  const message = `Olá! Quero garantir uma das últimas 4 vagas de Black Friday desta semana.\n\nNome: ${lead.nome}\nWhatsApp: ${lead.whats}\nE-mail: ${lead.email}\nUnidade: ${lead.unidade}\nPacote: até ${lead.lentes} lentes\nValor: ${currency(offer.price)}\nParcelamento: até ${installmentText(offer)} no cartão de crédito\nCupom: ${BLACK_FRIDAY_COUPON}\nQuero realizar o procedimento nesta semana.\nEstou ciente do valor de ${currency(offer.price)} para até ${lead.lentes} lentes e de que o desconto é válido somente para as últimas 4 vagas desta semana.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}