import { describe, expect, it } from "vitest";
import { OFFERS, installmentAmount, savings } from "@/lib/offers";

describe("Black Friday offers", () => {
  it("prices ten veneers at 2899 instead of 5489", () => {
    expect(OFFERS.ten.price).toBe(2899);
    expect(OFFERS.ten.original).toBe(5489);
    expect(savings(OFFERS.ten)).toBe(2590);
  });

  it("prices twenty veneers at 5498 instead of 8998", () => {
    expect(OFFERS.twenty.price).toBe(5498);
    expect(OFFERS.twenty.original).toBe(8998);
    expect(savings(OFFERS.twenty)).toBe(3500);
  });

  it("recalculates ten veneers over twelve interest-free installments", () => {
    expect(OFFERS.ten.installments).toBe(12);
    expect(installmentAmount(OFFERS.ten)).toBe(241.58);
  });

  it("recalculates twenty veneers over twelve interest-free installments", () => {
    expect(OFFERS.twenty.installments).toBe(12);
    expect(installmentAmount(OFFERS.twenty)).toBe(458.17);
  });
});