/**
 * Compares two object of for equality.
 * 
 * Uses JSON.stringify conversion for comparison
 *
 * @param a - First object.
 * @param b - Second object.
 * @returns `true` if both object have the same order, length and identical elements 
 */
export const entitiesEqual = (a: Object, b: Object): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
};
