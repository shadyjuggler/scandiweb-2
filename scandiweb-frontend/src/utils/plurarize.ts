/**
 * Returns a properly pluralized word based on the provided count.
 *
 * @param count - The number determining word should be singular or plural.
 * @param singular - The singular word form.
 * @param plural - Optional. The plural word form. If not provided, 's' will be added to the singular form.
 * @returns A string with the count followed by the correct word form.
 *
 * @example
 * pluralize(1, 'human');           // "1 human"
 * pluralize(3, 'apple');           // "3 humans"
 * pluralize(1, 'child', 'children'); // "1 child"
 * pluralize(4, 'child', 'children'); // "4 children"
 */
export const pluralize = (
    count: number,
    singular: string,
    plural?: string
): string => {
    const word = count === 1 ? singular : plural ?? singular + "s";
    return `${count} ${word}`;
};
