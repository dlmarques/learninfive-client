import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TopicQuiz } from "@/types/Topic";
import Quiz from "../Quiz";
import { PAST_PLAYED_QUIZZES_STORAGE_KEY } from "@/shared/components/quiz/utils/guestQuizAttempts";

const mocks = vi.hoisted(() => ({
  answerQuiz: vi.fn(),
  getToken: vi.fn(),
}));

vi.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({
    getToken: mocks.getToken,
    isSignedIn: false,
  }),
  useUser: () => ({ isSignedIn: false }),
}));

vi.mock("../../services/answer", () => ({
  answerQuiz: mocks.answerQuiz,
}));

const renderWithProviders = (component: ReactNode) => {
  return render(
    <ChakraProvider value={defaultSystem}>{component}</ChakraProvider>
  );
};

const quiz: TopicQuiz = {
  id: "",
  question: "What is the right answer?",
  answers: [
    { id: "answer-1", content: "Wrong answer" },
    { id: "answer-2", content: "Right answer" },
  ],
  rightAnswer: "answer-2",
};

describe("Quiz", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mocks.getToken.mockResolvedValue(null);
  });

  it("stores and displays the first guest answer when storage is empty", async () => {
    mocks.answerQuiz.mockResolvedValue({
      data: {
        success: true,
        content: "Quiz answered correctly",
        correct: true,
      },
    });

    renderWithProviders(<Quiz quiz={quiz} topicId="topic-1" />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(screen.getByText("Right answer"));

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mocks.answerQuiz).toHaveBeenCalledWith("answer-2", "topic-1");
    });

    expect(await screen.findByText("Correct!")).toBeInTheDocument();
    expect(
      JSON.parse(
        localStorage.getItem(PAST_PLAYED_QUIZZES_STORAGE_KEY) ?? "[]"
      )
    ).toEqual([{ id: "topic-1", correct: true }]);
  });
});
