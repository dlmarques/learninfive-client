import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const Result = ({
  result,
  getCorrectAnswer,
}: {
  result: boolean;
  getCorrectAnswer: () => string;
}) => {
  return result ? (
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
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        paddingTop: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaCircleXmark size="30px" color="#ff2c2c" />
        <h3>Wrong!</h3>
      </div>

      <div>
        <h4>
          Correct answer: <p>{getCorrectAnswer()}</p>
        </h4>
      </div>
    </div>
  );
};

export default Result;
