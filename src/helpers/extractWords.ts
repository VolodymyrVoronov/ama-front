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
  ];

  let tempText = "";

  for (const element of questions) {
    tempText += element.question.toLowerCase();
  }

  const regex = new RegExp(`\\b(?:${exceptions.join("|")})\\b`, "gi");
  const cleanedText = tempText.replace(regex, "");
  const keywords = cleanedText.match(/[a-zA-Z]+/g) ?? [];

  return Array.from(new Set(keywords)).concat();
};
