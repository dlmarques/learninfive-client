import { describe, expect, it, vi, beforeEach } from "vitest";
import { getTopic } from "../getTopic";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe("getTopic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches the public daily topic without auth", async () => {
    await getTopic();

    expect(axiosInstance.get).toHaveBeenCalledWith("topics/today");
  });

  it("fetches the authenticated user's daily topic with auth", async () => {
    await getTopic("test-token");

    expect(axiosInstance.get).toHaveBeenCalledWith("me/topics/today", {
      headers: { Authorization: "Bearer test-token" },
    });
  });
});
