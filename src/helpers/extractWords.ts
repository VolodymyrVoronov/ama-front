/**
 * Extracts unique words from an array of objects containing a 'question' property.
 *
 * @param {Array} questions - The array of objects containing 'question' property.
 * @return {Array} An array of unique words extracted from the 'question' property.
 */
export const extractWords = <T extends { question: string }>(
  questions: T[]
): string[] => {
  if (!questions) {
    return [];
  }

  const exceptions = [
    "and",
    "but",
    "or",
    "nor",
    "for",
    "yet",
    "so",
    "above",
    "under",
    "beside",
    "between",
    "into",
    "through",
    "after",
    "before",
    "to",
    "from",
    "in",
    "on",
    "by",
    "of",
    "such",
    "at",
    "is",
    "are",
    "was",
    "were",
    "am",
    "where",
    "what",
    "others",
    "so",
    "also",
    "with",
    "without",
    "a",
    "an",
    "the",
    "why",
    "how",
    "which",
    "that",
    "this",
    "these",
    "those",
    "my",
    "your",
    "his",
    "her",
    "its",
    "here",
    "when",
    "there",
    "it",
    "have",
    "has",
    "do",
    "does",
    "did",
    "will",
    "shall",
    "should",
    "can",
    "could",
    "would",
    "may",
    "might",
    "must",
    "had",
  ];

  let tempText = "";

  for (const element of questions) {
    tempText += element.question.toLowerCase();
  }

  const keywords = tempText
    .replace(/\p{P}/gu, " ")
    .split(" ")
    .filter((word) => !exceptions.includes(word) && word !== "");

  return Array.from(new Set(keywords));
};
