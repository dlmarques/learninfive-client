import { beforeEach, describe, expect, it } from "vitest";
import {
  findGuestQuizAttempt,
  PAST_PLAYED_QUIZZES_STORAGE_KEY,
  readGuestQuizAttempts,
  upsertGuestQuizAttempt,
} from "../guestQuizAttempts";

describe("guestQuizAttempts", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty list when storage contains malformed JSON", () => {
    localStorage.setItem(PAST_PLAYED_QUIZZES_STORAGE_KEY, "{not-json");

    expect(readGuestQuizAttempts()).toEqual([]);
  });

  it("returns an empty list when storage is not an array", () => {
    localStorage.setItem(
      PAST_PLAYED_QUIZZES_STORAGE_KEY,
      JSON.stringify({ id: "quiz-1", correct: true })
    );

    expect(readGuestQuizAttempts()).toEqual([]);
  });

  it("finds valid attempts by id and ignores wrong ids", () => {
    localStorage.setItem(
      PAST_PLAYED_QUIZZES_STORAGE_KEY,
      JSON.stringify([{ id: "quiz-1", correct: false }])
    );

    expect(findGuestQuizAttempt("quiz-1")).toEqual({
      id: "quiz-1",
      correct: false,
    });
    expect(findGuestQuizAttempt("quiz-2")).toBeUndefined();
  });

  it("upserts attempts without duplicating ids", () => {
    upsertGuestQuizAttempt({ id: "quiz-1", correct: false });
    upsertGuestQuizAttempt({ id: "quiz-1", correct: true });

    const attempts = JSON.parse(
      localStorage.getItem(PAST_PLAYED_QUIZZES_STORAGE_KEY) ?? "[]"
    );

    expect(attempts).toEqual([{ id: "quiz-1", correct: true }]);
  });
});
