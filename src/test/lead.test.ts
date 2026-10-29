import { describe, expect, it } from "vitest";
import { leadDestination, leadSchema, whatsappUrl } from "@/lib/lead";

const lead = { nome: "Paciente Teste", whats: "11987654321", email: "paciente@example.com", unidade: "Tatuapé - SP", prazo: "esta-semana" };

describe("Required scheduling qualification", () => {
  it("sends a completed form for this week to WhatsApp", () => {
    expect(leadDestination("esta-semana")).toBe("whatsapp");
    const url = whatsappUrl(lead, "5511999999999");
    expect(url).toContain("https://wa.me/5511999999999?text=");
    expect(decodeURIComponent(url ?? "")).toContain("Quero realizar o procedimento nesta semana.");
  });
  it("sends future dates to thanks and never generates a WhatsApp URL", () => {
    expect(leadDestination("data-futura")).toBe("agradecimento");
    expect(whatsappUrl({ ...lead, prazo: "data-futura" }, "5511999999999")).toBeNull();
  });
  it("blocks WhatsApp until all form fields and qualification are valid", () => {
    for (const field of Object.keys(lead)) {
      const incomplete = { ...lead, [field]: "" };
      expect(leadSchema.safeParse(incomplete).success).toBe(false);
      expect(() => whatsappUrl(incomplete, "5511999999999")).toThrow();
    }
  });
  it("rejects invalid or excessive input before building an external URL", () => {
    for (const invalid of [{ nome: "<script>" }, { nome: "a".repeat(101) }, { whats: "abc" }, { email: "invalid" }, { unidade: "Unknown" }, { prazo: "unknown" }]) {
      expect(leadSchema.safeParse({ ...lead, ...invalid }).success).toBe(false);
    }
  });
});