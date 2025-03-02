import Definition from "./components/Definition";
import Analogy from "./components/Analogy";
import Examples from "./components/Examples";
import Quiz from "./components/Quiz";
import { useQuery } from "@tanstack/react-query";
import { getTopic } from "./services/getTopic";

const Topic = () => {
  const {
    data: response,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTopic,
  });

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>Error</div>;

  const topic = response?.data.content;

  return (
    <>
      {topic && (
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          <h1>Learn {topic.concept} in 5 minutes</h1>
          <Definition concept={topic.concept} defintion={topic.definition} />
          <Analogy analogy={topic.realWorldAnalogy} />
          <Examples examples={topic.examples} />
          <Quiz quiz={topic.quiz} />
        </div>
      )}
    </>
  );
};

export default Topic;
