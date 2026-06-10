import QuizComponent from "@/shared/components/quiz";
import type { TopicQuiz } from "@/types/Topic";
import { useAuth } from "@clerk/clerk-react";
import { answerQuiz } from "../services/answer";
import toast from "react-hot-toast";
import { redirect } from "@tanstack/react-router";
import { upsertGuestQuizAttempt } from "@/shared/components/quiz/utils/guestQuizAttempts";

const Quiz = ({ quiz, topicId }: { quiz: TopicQuiz; topicId: string }) => {
  const { getToken, isSignedIn } = useAuth();
  const guestReplayId = quiz.id || topicId;

  const onAnswer = async (answerId: string) => {
    const token = await getToken();
    if (isSignedIn) {
      if (token) {
        const response = await answerQuiz(answerId, topicId, token);
        return response.data;
      } else {
        toast.error("User not authenticated.");
        redirect({ to: "/sign-in" });
      }
    } else {
      const response = await answerQuiz(answerId, topicId);

      upsertGuestQuizAttempt({
        id: guestReplayId,
        correct: response.data.correct,
      });
      return response.data;
    }
  };

  return (
    <div style={{ paddingBottom: "32px" }}>
      <h3>Quiz</h3>
      <QuizComponent
        guestReplayId={guestReplayId}
        quiz={quiz}
        onAnswer={onAnswer}
      />
    </div>
  );
};

export default Quiz;
