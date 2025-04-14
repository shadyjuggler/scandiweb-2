/**
 * Converts a given string to kebab-case.
 *
 * @param string to convert
 * @returns kebab-case of the input
 */
export const toKebabCase = (input: string): string => {
    return input
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
