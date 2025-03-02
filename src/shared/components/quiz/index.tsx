import type { TopicQuiz } from "@/types/Topic";
import { useState } from "react";
import { Radio, RadioGroup } from "../radio";
import { Button } from "@chakra-ui/react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const QuizComponent = ({ quiz }: { quiz: TopicQuiz }) => {
  const [value, setValue] = useState<string>();
  const [result, setResult] = useState<boolean>();

  const onAnswer = () => {
    debugger;
    localStorage.setItem("alreadyPlayed", "true");
    if (quiz.rightAnswer === value) {
      localStorage.setItem("quizResult", "win");
      setResult(true);
    } else {
      localStorage.setItem("quizResult", "lose");
      setResult(false);
    }
  };

  const getAlreadyPlayed = () => {
    const alreadyPlayed = localStorage.getItem("alreadyPlayed");
    return alreadyPlayed === "true";
  };

  const getQuizResult = () => {
    if (typeof result === "boolean") return result;
    const quizResult = localStorage.getItem("quizResult");
    if (quizResult) return quizResult === "win" ? true : false;
  };

  return (
    <div>
      <h5>{quiz.question}</h5>
      {!getAlreadyPlayed() && (
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
          <Button onClick={() => onAnswer()}>Submit</Button>
        </div>
      )}

      {getAlreadyPlayed() && getQuizResult() && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "16px",
          }}
        >
          <FaCheckCircle size="30px" color="#5cb85c" />
          <h3>Correct!</h3>
        </div>
      )}
      {getAlreadyPlayed() && !getQuizResult() && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "16px",
          }}
        >
          <FaCircleXmark size="30px" color="#ff2c2c" />
          <h3>Wrong!</h3>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
