import { describe, expect, it } from "vitest";
import { leadDestination, leadSchema, whatsappUrl } from "@/lib/lead";

const lead = { nome: "Paciente Teste", whats: "11987654321", email: "paciente@example.com", unidade: "Tatuapé - SP", lentes: "20", prazo: "esta-semana" };

describe("Required scheduling qualification", () => {
  it("sends a completed form for this week to WhatsApp", () => {
    expect(leadDestination("esta-semana")).toBe("whatsapp");
    const url = whatsappUrl(lead, "5511912686897");
    expect(url).toContain("https://wa.me/5511912686897?text=");
    expect(decodeURIComponent(url ?? "")).toContain("Quero realizar o procedimento nesta semana.");
  });
  it("sends future dates to thanks and never generates a WhatsApp URL", () => {
    expect(leadDestination("data-futura")).toBe("agradecimento");
    expect(whatsappUrl({ ...lead, prazo: "data-futura" }, "5511912686897")).toBeNull();
  });
  it("blocks WhatsApp until all form fields and qualification are valid", () => {
    for (const field of Object.keys(lead)) {
      const incomplete = { ...lead, [field]: "" };
      expect(leadSchema.safeParse(incomplete).success).toBe(false);
      expect(() => whatsappUrl(incomplete, "5511912686897")).toThrow();
    }
  });
  it("rejects invalid or excessive input before building an external URL", () => {
    for (const invalid of [{ nome: "<script>" }, { nome: "a".repeat(101) }, { whats: "abc" }, { email: "invalid" }, { unidade: "Unknown" }, { prazo: "unknown" }, { lentes: "15" }]) {
      expect(leadSchema.safeParse({ ...lead, ...invalid }).success).toBe(false);
    }
  });
  it("rejects e-mail addresses without a real domain", () => {
    for (const email of ["paciente@example", "paciente@", "@example.com", "paciente example.com", "paciente@example.c"]) {
      expect(leadSchema.safeParse({ ...lead, email }).success).toBe(false);
    }
  });
  it("rejects phone numbers without a valid DDD", () => {
    for (const whats of ["987654321", "10987654321", "119876543", "119876543210", "0011987654321"]) {
      expect(leadSchema.safeParse({ ...lead, whats }).success).toBe(false);
    }
  });
  it("accepts mobile, landline and country-code formats with DDD", () => {
    for (const whats of ["11987654321", "(11) 98765-4321", "1132345678", "5511987654321", "+55 21 99876-5432"]) {
      expect(leadSchema.safeParse({ ...lead, whats }).success).toBe(true);
    }
  });
  it.each([["10", "R$ 2.899", "12x de R$ 241,58"], ["20", "R$ 5.498", "12x de R$ 458,17"]])("sends the selected %s lenses with their exact price and installments", (lentes, price, installments) => {
    const message = decodeURIComponent(whatsappUrl({ ...lead, lentes }, "5511912686897") ?? "");
    expect(message).toContain(`Pacote: até ${lentes} lentes`);
    expect(message).toContain(`Valor: ${price}`);
    expect(message).toContain(installments);
  });
  it("includes all contact details, this week and the BLACKFRIDAY coupon", () => {
    const message = decodeURIComponent(whatsappUrl(lead, "5511912686897") ?? "");
    for (const detail of ["Nome: Paciente Teste", "WhatsApp: 11987654321", "E-mail: paciente@example.com", "Unidade: Tatuapé - SP", "Quero realizar o procedimento nesta semana.", "Cupom: BLACKFRIDAY"]) {
      expect(message).toContain(detail);
    }
  });
  it.each(["10", "20"])("never generates a WhatsApp URL for future dates with %s lenses", (lentes) => {
    expect(whatsappUrl({ ...lead, lentes, prazo: "data-futura" }, "5511912686897")).toBeNull();
  });
});
import { isBotSubmission } from "@/lib/lead";
import { describe as d2, it as i2, expect as e2 } from "vitest";
d2("honeypot", () => {
  i2("ignores submissions with the hidden field filled", () => {
    e2(isBotSubmission("http://spam")).toBe(true);
    e2(isBotSubmission("")).toBe(false);
    e2(isBotSubmission(null)).toBe(false);
  });
});
import { webhookPayload } from "@/lib/lead";
d2("n8n webhook payload", () => {
  i2.each([["10", 2899], ["20", 5498]])("sends Purchase with value for %s lenses in BRL", (lentes, value) => {
    const data = leadSchema.parse({ ...lead, lentes });
    const p = webhookPayload(data, "id1", 1);
    e2(p).toMatchObject({ event: "Purchase", event_id: "id1", value, currency: "BRL", phone: "11987654321", email: "paciente@example.com", name: "Paciente Teste" });
  });
});
