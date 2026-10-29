import { describe, expect, it } from "vitest";
import { leadDestination, leadSchema, whatsappUrl } from "@/lib/lead";

const lead = { nome: "Paciente Teste", whats: "11987654321", email: "paciente@example.com", unidade: "Tatuapé - SP", lentes: "20", prazo: "esta-semana", ciente: "sim" };

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
    for (const invalid of [{ nome: "<script>" }, { nome: "a".repeat(101) }, { whats: "abc" }, { email: "invalid" }, { unidade: "Unknown" }, { prazo: "unknown" }, { lentes: "15" }, { ciente: "nao" }]) {
      expect(leadSchema.safeParse({ ...lead, ...invalid }).success).toBe(false);
    }
  });
  it.each([["10", "R$ 2.899", "12x de R$ 241,58"], ["20", "R$ 5.498", "12x de R$ 458,17"]])("sends the selected %s lenses with their exact price and installments", (lentes, price, installments) => {
    const message = decodeURIComponent(whatsappUrl({ ...lead, lentes }, "5511912686897") ?? "");
    expect(message).toContain(`Pacote: até ${lentes} lentes`);
    expect(message).toContain(`Valor: ${price}`);
    expect(message).toContain(installments);
    expect(message).toContain(`Estou ciente do valor de ${price} para até ${lentes} lentes`);
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