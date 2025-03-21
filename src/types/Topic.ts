export interface Topic {
  id: string;
  concept: string;
  definition: string;
  realWorldAnalogy: string;
  examples: TopicExample[];
  quiz: TopicQuiz;
  date: Date;
}

export interface TopicExample {
  language:
    | "JavaScript"
    | "Python"
    | "Java"
    | "C#"
    | "C++"
    | "TypeScript"
    | "PHP";
  code: string;
}

export interface TopicQuiz {
  id: string;
  question: string;
  answers: TopicQuizAnswers[];
  rightAnswer: string;
  userAnswer?: boolean;
}

interface TopicQuizAnswers {
  id: string;
  content: string;
}

export enum Languages {
  JavaScript = "javascript",
  Python = "python",
  Java = "java",
  "C#" = "csharp",
  "C++" = "cpp",
  TypeScript = "typescript",
  PHP = "php",
}
