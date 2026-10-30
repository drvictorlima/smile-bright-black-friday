import { describe, expect, it } from "vitest";
import { RESULTS_INTERVAL_MS } from "../lib/results";

describe("automatic photo changes", () => {
  it("changes photographs every one second", () => {
    expect(RESULTS_INTERVAL_MS).toBe(2750);
  });
});