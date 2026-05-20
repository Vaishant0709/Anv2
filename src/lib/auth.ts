import { logger } from "@/lib/logger";

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function getLevenshteinDistance(source: string, target: string) {
  if (source === target) {
    return 0;
  }

  if (source.length === 0) {
    return target.length;
  }

  if (target.length === 0) {
    return source.length;
  }

  const matrix = Array.from({ length: source.length + 1 }, () =>
    Array<number>(target.length + 1).fill(0),
  );

  for (let row = 0; row <= source.length; row += 1) {
    matrix[row][0] = row;
  }

  for (let column = 0; column <= target.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= source.length; row += 1) {
    for (let column = 1; column <= target.length; column += 1) {
      const cost = source[row - 1] === target[column - 1] ? 0 : 1;

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost,
      );
    }
  }

  return matrix[source.length][target.length];
}

function isCloseMatch(candidate: string, expected: string) {
  if (candidate === expected) {
    return true;
  }

  const maxLength = Math.max(candidate.length, expected.length);

  if (maxLength <= 4) {
    return getLevenshteinDistance(candidate, expected) <= 1;
  }

  return getLevenshteinDistance(candidate, expected) <= 2;
}

export function validatePasswordAttempt(input: string, acceptedAnswers: string[]) {
  logger.info("[auth] validation started");

  const normalizedInput = normalizeAnswer(input);
  const normalizedAnswers = acceptedAnswers.map(normalizeAnswer).filter(Boolean);

  if (!normalizedInput || normalizedAnswers.length === 0) {
    logger.warn("[auth] validation failed", {
      reason: "missing-input-or-answers",
    });
    return false;
  }

  const isMatch = normalizedAnswers.some((answer) => isCloseMatch(normalizedInput, answer));

  if (!isMatch) {
    logger.warn("[auth] validation failed", {
      reason: "no-match",
      inputLength: normalizedInput.length,
    });
  }

  return isMatch;
}
