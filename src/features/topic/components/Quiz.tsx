import QuizComponent from "@/shared/components/quiz";
import type { TopicQuiz } from "@/types/Topic";
import { useAuth } from "@clerk/clerk-react";
import { answerQuiz } from "../services/answer";
import toast from "react-hot-toast";
import { redirect } from "@tanstack/react-router";

const Quiz = ({ quiz, topicId }: { quiz: TopicQuiz; topicId: string }) => {
  const { getToken } = useAuth();
  const { isSignedIn } = useAuth();

  const onAnswer = async (answer: string) => {
    const token = await getToken();
    if (isSignedIn) {
      if (token) {
        const response = await answerQuiz(answer, topicId, token);

        if (response.data.success) {
          return response.data;
        } else {
          toast.error("Something went wrong.");
        }
      } else {
        toast.error("User not authenticated.");
        redirect({ to: "/sign-in" });
      }
    } else {
      const response = await answerQuiz(answer, topicId);
      const playedQuiz = {
        id: quiz.id,
        correct: response.data.correct,
      };
      const pastPlayedQuizzes = localStorage.getItem("pastPlayedQuizzes");
      if (pastPlayedQuizzes) {
        const pastPlayedQuizzesArray = JSON.parse(pastPlayedQuizzes);

        if (response.data.success) {
          pastPlayedQuizzesArray.push(playedQuiz);
          localStorage.setItem(
            "pastPlayedQuizzes",
            JSON.stringify(pastPlayedQuizzesArray)
          );
          return response.data;
        } else {
          toast.error("Something went wrong.");
        }
      } else {
        localStorage.setItem("pastPlayedQuizzes", JSON.stringify([playedQuiz]));
      }
    }
  };

  return (
    <div style={{ paddingBottom: "32px" }}>
      <h3>Quiz</h3>
      <QuizComponent quiz={quiz} onAnswer={onAnswer} />
    </div>
  );
};

export default Quiz;
