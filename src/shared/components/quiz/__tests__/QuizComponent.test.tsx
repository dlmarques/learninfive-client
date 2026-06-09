import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TopicQuiz } from "@/types/Topic";
import QuizComponent from "../index";
import { PAST_PLAYED_QUIZZES_STORAGE_KEY } from "../utils/guestQuizAttempts";

vi.mock("@clerk/clerk-react", () => ({
  useUser: () => ({ isSignedIn: false }),
}));

const renderWithProviders = (component: ReactNode) => {
  return render(
    <ChakraProvider value={defaultSystem}>{component}</ChakraProvider>
  );
};

const quiz: TopicQuiz = {
  id: "quiz-1",
  question: "What is the right answer?",
  answers: [
    { id: "answer-1", content: "Wrong answer" },
    { id: "answer-2", content: "Right answer" },
  ],
  rightAnswer: "answer-2",
};

describe("QuizComponent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a stored guest replay result for the matching replay id", async () => {
    localStorage.setItem(
      PAST_PLAYED_QUIZZES_STORAGE_KEY,
      JSON.stringify([{ id: "topic-1", correct: false }])
    );

    renderWithProviders(
      <QuizComponent
        guestReplayId="topic-1"
        quiz={quiz}
        onAnswer={vi.fn()}
      />
    );

    expect(await screen.findByText("Wrong!")).toBeInTheDocument();
    expect(screen.getByText("Right answer")).toBeInTheDocument();
  });
});
