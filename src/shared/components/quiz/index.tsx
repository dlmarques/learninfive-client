import type { TopicQuiz } from "@/types/Topic";
import { useState } from "react";
import { Radio, RadioGroup } from "../radio";
import { Button } from "@chakra-ui/react";

// TODO - Finish Quiz
const QuizComponent = ({ quiz }: { quiz: TopicQuiz }) => {
  const [value, setValue] = useState();
  return (
    <div>
      <h5>{quiz.question}</h5>
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
              <Radio key={answer.id} value={answer.id}>
                <p>{answer.content}</p>
              </Radio>
            );
          })}
        </RadioGroup>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default QuizComponent;
