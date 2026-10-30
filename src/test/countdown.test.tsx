import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCountdown } from "../lib/countdown";

afterEach(() => vi.useRealTimers());

describe("three-minute campaign countdown", () => {
  it("starts at three minutes and expires exactly after 180 seconds", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useCountdown());
    expect(result.current).toEqual({ minutes: "03", seconds: "00", expired: false });
    act(() => vi.advanceTimersByTime(179_000));
    expect(result.current).toEqual({ minutes: "00", seconds: "01", expired: false });
    act(() => vi.advanceTimersByTime(1_000));
    expect(result.current).toEqual({ minutes: "00", seconds: "00", expired: true });
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current).toEqual({ minutes: "00", seconds: "00", expired: true });
    unmount();
  });
});