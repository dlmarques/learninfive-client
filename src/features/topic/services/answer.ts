import { axiosInstance } from "@/utils/interceptors";

export const answerQuiz = (answer: string, topicId: string, token?: string) => {
  return axiosInstance.post(
    `topics/answer-quiz`,
    {
      answer,
      topicId,
    },
    {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    }
  );
};
