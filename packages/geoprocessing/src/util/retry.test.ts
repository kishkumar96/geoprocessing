import { describe, test, expect, vi } from "vitest";
import { retry } from "./retry.js";
describe("retry", () => {
  test("should succeed on the first try", async () => {
    const fn = vi.fn().mockResolvedValue("success");
    const result = await retry(fn, []);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should fail the first time and succeed the second time", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("first failure"))
      .mockResolvedValueOnce("success");
    const result = await retry(fn, []);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("should fail all retry attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("failure"));
    await expect(retry(fn, [], 3)).rejects.toThrow("failure");
    expect(fn).toHaveBeenCalledTimes(4);
  });
});
