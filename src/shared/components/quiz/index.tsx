import type { TopicQuiz } from "@/types/Topic";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "../radio/radio";
import { Button, Spinner } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import Result from "./components/Result";

const QuizComponent = ({
  quiz,
  onAnswer,
}: {
  quiz: TopicQuiz;
  onAnswer: (answer: string) => Promise<{
    success: boolean;
    content: string;
    correct: boolean;
  }>;
}) => {
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
      const pastPlayedQuizzes = localStorage.getItem("pastPlayedQuizzes");
      if (pastPlayedQuizzes) {
        const pastPlayedQuizzesArray = JSON.parse(pastPlayedQuizzes);
        return setIsAlreadyPlayed(pastPlayedQuizzesArray.includes(quiz.id));
      }
      return setIsAlreadyPlayed(false);
    }
  };

  const getQuizResult = () => {
    if (result !== undefined) return result;
    if (isSignedIn) {
      if (quiz.userAnswer !== undefined) {
        return quiz.userAnswer;
      }
    } else {
      const pastPlayedQuizzes = localStorage.getItem("pastPlayedQuizzes");
      if (pastPlayedQuizzes) {
        const pastPlayedQuizzesArray = JSON.parse(pastPlayedQuizzes);
        return pastPlayedQuizzesArray.find(
          (quiz: TopicQuiz) => quiz.id === quiz.id
        ).isCorrect;
      }
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
  }, [result]);

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
        <Result
          result={result ?? getQuizResult()}
          getCorrectAnswer={getCorrectAnswer}
        />
      )}
    </div>
  );
};

export default QuizComponent;
