/**
 * Utility function to make first letter of string uppercased
 * 
 * @param str string
 * @returns string with first char uppercased
 */

export const ucfirst = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1);
}