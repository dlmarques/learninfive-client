export const PAST_PLAYED_QUIZZES_STORAGE_KEY = "pastPlayedQuizzes";

/**
 * Anonymous quiz attempt persisted in browser storage.
 */
export type GuestQuizAttempt = {
  id: string;
  correct: boolean;
};

const isGuestQuizAttempt = (value: unknown): value is GuestQuizAttempt => {
  if (typeof value !== "object" || value === null) return false;

  const attempt = value as Partial<GuestQuizAttempt>;

  return typeof attempt.id === "string" && typeof attempt.correct === "boolean";
};

export const readGuestQuizAttempts = (): GuestQuizAttempt[] => {
  const storedAttempts = localStorage.getItem(PAST_PLAYED_QUIZZES_STORAGE_KEY);

  if (!storedAttempts) return [];

  try {
    const parsedAttempts: unknown = JSON.parse(storedAttempts);

    if (!Array.isArray(parsedAttempts)) return [];

    return parsedAttempts.filter(isGuestQuizAttempt);
  } catch {
    return [];
  }
};

/**
 * Looks up a stored anonymous attempt without throwing on malformed storage.
 */
export const findGuestQuizAttempt = (
  id: string
): GuestQuizAttempt | undefined => {
  return readGuestQuizAttempts().find((attempt) => attempt.id === id);
};

/**
 * Stores the latest anonymous attempt result while keeping one entry per id.
 */
export const upsertGuestQuizAttempt = (attempt: GuestQuizAttempt) => {
  const attempts = readGuestQuizAttempts();
  const hasAttempt = attempts.some(
    (storedAttempt) => storedAttempt.id === attempt.id
  );
  const nextAttempts = hasAttempt
    ? attempts.map((storedAttempt) =>
        storedAttempt.id === attempt.id ? attempt : storedAttempt
      )
    : [...attempts, attempt];

  localStorage.setItem(
    PAST_PLAYED_QUIZZES_STORAGE_KEY,
    JSON.stringify(nextAttempts)
  );
};
