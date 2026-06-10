import { describe, expect, it, vi, beforeEach } from "vitest";
import { getUserData } from "../getUserData";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe("getUserData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches the authenticated user's profile", async () => {
    await getUserData("test-token");

    expect(axiosInstance.get).toHaveBeenCalledWith("me/profile", {
      headers: { Authorization: "Bearer test-token" },
    });
  });
});
