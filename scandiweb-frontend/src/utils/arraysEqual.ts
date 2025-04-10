/**
 * Compares two arrays of numbers for strict equality.
 *
 * @param a - First array of numbers.
 * @param b - Second array of numbers.
 * @returns `true` if both arrays have the same order, length and identical elements 
 */
export const arraysEqual = (a: number[], b: number[]): boolean => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
};
