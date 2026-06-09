import type { TopicQuiz } from "@/types/Topic";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "../radio/radio";
import { Button, Spinner } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import Result from "./components/Result";
import { findGuestQuizAttempt } from "./utils/guestQuizAttempts";

type QuizComponentProps = {
  /**
   * Stable key for anonymous replay lookup.
   * Uses the topic id when older public topics do not have a quiz id.
   */
  guestReplayId: string;
  quiz: TopicQuiz;
  onAnswer: (answer: string) => Promise<{
    success: boolean;
    content: string;
    correct: boolean;
  }>;
};

const QuizComponent = ({
  guestReplayId,
  quiz,
  onAnswer,
}: QuizComponentProps) => {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlreadyPlayed, setIsAlreadyPlayed] = useState<boolean>(false);
  const { isSignedIn } = useUser();

  const getAlreadyPlayed = () => {
    if (result !== undefined) return setIsAlreadyPlayed(true);

    if (isSignedIn) {
      return setIsAlreadyPlayed(quiz.userAnswer !== undefined);
    } else {
      return setIsAlreadyPlayed(
        findGuestQuizAttempt(guestReplayId) !== undefined
      );
    }
  };

  const getQuizResult = () => {
    if (result !== undefined) return result;
    if (isSignedIn) {
      if (quiz.userAnswer !== undefined) {
        return quiz.userAnswer;
      }
    } else {
      return findGuestQuizAttempt(guestReplayId)?.correct;
    }
  };

  const getCorrectAnswer = () => {
    const index = quiz.answers.findIndex(
      (answer) => answer.id === quiz.rightAnswer
    );
    return quiz.answers[index].content;
  };

  useEffect(() => {
    getAlreadyPlayed();
  }, [guestReplayId, isSignedIn, quiz.userAnswer, result]);

  const quizResult = result ?? getQuizResult();

  return (
    <div>
      <h5>{quiz.question}</h5>
      {!isAlreadyPlayed ? (
        <div
          style={{
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <RadioGroup
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {quiz.answers.map((answer) => {
              return (
                <Radio
                  key={answer.id}
                  value={answer.id}
                  onClick={() => setValue(answer.id)}
                >
                  <p>{answer.content}</p>
                </Radio>
              );
            })}
          </RadioGroup>
          <Button
            disabled={!value}
            onClick={async () => {
              setIsLoading(true);
              if (value) {
                const result = await onAnswer(value);
                setIsLoading(false);

                if (result.success) {
                  setResult(result.correct);
                }
              }
            }}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </div>
      ) : (
        quizResult !== undefined && (
          <Result result={quizResult} getCorrectAnswer={getCorrectAnswer} />
        )
      )}
    </div>
  );
};

export default QuizComponent;
