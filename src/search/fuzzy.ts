import { normalize } from './normalize';

export interface FuzzyCandidate<T> {
  item: T;
  title: string; // Original title/name for display or reference
}

export interface FuzzyResult<T> {
  item: T;
  score: number;
}

/**
 * Calculates Levenshtein distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Generates trigrams for Dice coefficient calculation.
 */
function getTrigrams(str: string): Set<string> {
  const trigrams = new Set<string>();
  const padded = `  ${str} `;
  for (let i = 0; i < padded.length - 2; i++) {
    trigrams.add(padded.substring(i, i + 3));
  }
  return trigrams;
}

/**
 * Calculates Dice coefficient on trigrams.
 */
function diceCoefficient(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const triA = getTrigrams(a);
  const triB = getTrigrams(b);

  let intersection = 0;
  for (const tri of triA) {
    if (triB.has(tri)) intersection++;
  }

  return (2 * intersection) / (triA.size + triB.size);
}

/**
 * Scores a candidate against a query string.
 */
export function scoreMatch(queryNorm: string, targetNorm: string): number {
  if (!queryNorm || !targetNorm) return 0;

  // 1. Exact match
  if (queryNorm === targetNorm) return 1.0;

  let maxScore = 0;

  // 2. Prefix match (query length >= 3)
  const targetTokens = targetNorm.split(' ').filter(Boolean);
  const queryTokens = queryNorm.split(' ').filter(Boolean);

  if (queryNorm.length >= 3 && targetTokens.some((token) => token.startsWith(queryNorm))) {
    maxScore = Math.max(maxScore, 0.95);
  }

  // 3. Substring match
  if (targetNorm.includes(queryNorm)) {
    maxScore = Math.max(maxScore, 0.90);
  }

  // 4. Dice trigrams coefficient
  const diceScore = diceCoefficient(queryNorm, targetNorm);
  maxScore = Math.max(maxScore, diceScore);

  // 5. Levenshtein token-to-token for single word query
  if (queryTokens.length === 1 && queryTokens[0].length >= 3) {
    const qToken = queryTokens[0];
    for (const tToken of targetTokens) {
      const dist = levenshteinDistance(qToken, tToken);
      const maxLen = Math.max(qToken.length, tToken.length);
      const levScore = 1 - dist / maxLen;
      maxScore = Math.max(maxScore, levScore);
    }
  }

  // Multi-token bonus: if query has multiple words and all are prefixes of target tokens
  if (queryTokens.length > 1) {
    const allMatched = queryTokens.every((q) =>
      targetTokens.some((t) => t.startsWith(q) || t.includes(q))
    );
    if (allMatched) {
      maxScore = Math.min(1.0, maxScore + 0.15);
    }
  }

  return maxScore;
}

/**
 * Performs fuzzy search on a list of candidates, returning up to maxResults above threshold (default 0.45).
 */
export function searchFuzzy<T>(
  query: string,
  candidates: { item: T; searchTitle: string }[],
  threshold = 0.45,
  maxResults = 3
): FuzzyResult<T>[] {
  const queryNorm = normalize(query);
  if (!queryNorm) return [];

  const scored: FuzzyResult<T>[] = candidates
    .map((c) => ({
      item: c.item,
      score: scoreMatch(queryNorm, normalize(c.searchTitle)),
    }))
    .filter((res) => res.score >= threshold)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, maxResults);
}
