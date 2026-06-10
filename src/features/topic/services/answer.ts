import { axiosInstance } from "@/utils/interceptors";

export type AnswerQuizResponse = {
  correct: boolean;
};

export const answerQuiz = (
  answerId: string,
  topicId: string,
  token?: string
) => {
  return axiosInstance.post<AnswerQuizResponse>(
    `topics/${topicId}/answers`,
    { answerId },
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
};
