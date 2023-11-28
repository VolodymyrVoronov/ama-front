/**
 * Extracts and returns an array of unique, sorted dates from an array of objects.
 *
 * @param {T[]} array - The array of objects from which to extract the dates.
 * @param {keyof T} dateField - The field name in the objects representing the date values.
 * @return {string[]} An array of unique, sorted dates extracted from the given array of objects.
 */
export const extractSortedDates = <
  T extends { [K in keyof T]: string | number }
>(
  array: T[],
  dateField: keyof T
): string[] => {
  if (!array || !dateField) {
    return [];
  }

  const sortedDates = array.toSorted((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);

    return dateB.getTime() - dateA.getTime();
  });

  const dates = sortedDates.map((a) => String(a[dateField]));

  return Array.from(new Set(dates));
};
