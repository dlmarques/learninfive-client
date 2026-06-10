import { describe, expect, it, vi, beforeEach } from "vitest";
import { editProfile } from "../editProfile";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    patch: vi.fn(),
  },
}));

describe("editProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a profile without sending userId", async () => {
    const profile = {
      csLevel: "intermediate",
      goals: "learn system design",
      preferences: "TypeScript examples",
      topicsToAvoid: "assembly",
    };

    await editProfile(profile, "test-token");

    expect(axiosInstance.patch).toHaveBeenCalledWith("me/profile", profile, {
      headers: { Authorization: "Bearer test-token" },
    });
  });
});
