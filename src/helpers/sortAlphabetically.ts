/**
 * Sorts an array of strings alphabetically.
 *
 * @param {string[]} array - The array of strings to be sorted.
 * @return {string[]} - The sorted array of strings.
 */
export const sortAlphabetically = (array: string[]): string[] => {
  if (!array) {
    return [];
  }

  return array.sort((a, b) => a.localeCompare(b));
};
