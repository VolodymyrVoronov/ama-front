/**
 * Sorts an array of objects by a specified date field in descending order.
 *
 * @param {T[]} array - The array of objects to be sorted.
 * @param {keyof T} dateField - The date field to sort the objects by.
 * @return {T[]} The sorted array of objects.
 */
export const sortByDate = <T extends { [K in keyof T]: string | number }>(
  array: T[],
  dateField: keyof T
): T[] => {
  if (!array || !dateField) {
    return [];
  }

  return array.sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);

    return dateB.getTime() - dateA.getTime();
  });
};
