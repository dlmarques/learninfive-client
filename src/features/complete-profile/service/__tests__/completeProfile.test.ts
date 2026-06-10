import { describe, expect, it, vi, beforeEach } from "vitest";
import { completeProfile } from "../completeProfile";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("completeProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a profile without sending userId", async () => {
    const profile = {
      csLevel: "beginner",
      goals: "learn TypeScript",
      preferences: "short examples",
      topicsToAvoid: "assembly",
    };

    await completeProfile(profile, "test-token");

    expect(axiosInstance.post).toHaveBeenCalledWith("me/profile", profile, {
      headers: { Authorization: "Bearer test-token" },
    });
  });
});
