export interface Topic {
  concept: string;
  definition: string;
  realWorldAnalogy: string;
  examples: TopicExample[];
  quiz: TopicQuiz;
  date: Date;
}

export interface TopicExample {
  language: string;
  code: string;
}

export interface TopicQuiz {
  question: string;
  answers: TopicQuizAnswers[];
  rightAnswer: string;
}

interface TopicQuizAnswers {
  id: string;
  content: string;
}
