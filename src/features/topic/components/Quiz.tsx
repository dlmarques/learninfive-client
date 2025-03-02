import QuizComponent from "@/shared/components/quiz";
import type { TopicQuiz } from "@/types/Topic";

const Quiz = ({ quiz }: { quiz: TopicQuiz }) => {
  return (
    <div style={{ paddingBottom: "32px" }}>
      <h3>Quiz</h3>
      <QuizComponent quiz={quiz} />
    </div>
  );
};

export default Quiz;
