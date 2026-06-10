import { describe, expect, it, vi, beforeEach } from "vitest";
import { answerQuiz } from "../answer";
import { axiosInstance } from "@/utils/interceptors";

vi.mock("@/utils/interceptors", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("answerQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a public quiz answer with the topic id in the URL", async () => {
    await answerQuiz("answer-1", "topic-1");

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "topics/topic-1/answers",
      { answerId: "answer-1" },
      undefined
    );
  });

  it("submits an authenticated quiz answer with a bearer token", async () => {
    await answerQuiz("answer-1", "topic-1", "test-token");

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "topics/topic-1/answers",
      { answerId: "answer-1" },
      { headers: { Authorization: "Bearer test-token" } }
    );
  });
});
