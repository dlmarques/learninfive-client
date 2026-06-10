import { describe, expect, it, vi, beforeEach } from "vitest";
import { checkUserProfile } from "../checkUserProfile";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe("checkUserProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches profile status from the v1 me endpoint", async () => {
    await checkUserProfile("test-token");

    expect(axiosInstance.get).toHaveBeenCalledWith("me/profile/status", {
      headers: { Authorization: "Bearer test-token" },
    });
  });
});
