import Definition from "./components/Definition";
import Analogy from "./components/Analogy";
import Examples from "./components/Examples";
import Quiz from "./components/Quiz";
import { useQuery } from "@tanstack/react-query";
import { getTopic } from "./services/getTopic";
import { Spinner } from "@chakra-ui/react";
import { VscBracketError } from "react-icons/vsc";
import { useAuth } from "@clerk/clerk-react";
import type { Topic } from "@/types/Topic";
import { getApiError } from "@/utils/apiError";

const Topic = () => {
  const { getToken, isSignedIn } = useAuth();

  const {
    data: topic,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["topics", isSignedIn ? "authenticated" : "public"],
    queryFn: async () => {
      const token = await getToken();
      const topicResponse = await getTopic(token);
      return topicResponse.data;
    },
    retry: (failureCount, error) => {
      return (
        getApiError(error).code === "TOPIC_GENERATION_IN_PROGRESS" &&
        failureCount < 24
      );
    },
    retryDelay: () => 5000,
  });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <Spinner />
        <h4>Ohhh no, the server is sleeping again, please wait a moment.</h4>
      </div>
    );

  if (isError)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <VscBracketError size="30px" />
        <h4>
          Sorry, something went wrong, we will try to fix it as soon as
          possible.
        </h4>
      </div>
    );

  return (
    <>
      {topic && (
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          <h1>Learn {topic.concept} in 5 minutes</h1>
          <Definition concept={topic.concept} defintion={topic.definition} />
          <Analogy analogy={topic.realWorldAnalogy} />
          <Examples examples={topic.examples} />
          <Quiz quiz={topic.quiz} topicId={topic.id} />
        </div>
      )}
    </>
  );
};

export default Topic;
