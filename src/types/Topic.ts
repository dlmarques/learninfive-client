export interface Topic {
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
  question: string;
  answers: TopicQuizAnswers[];
  rightAnswer: string;
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
