/**
 * Formats display price
 *
 * @param symbol - The currency symbol ex. '$'
 * @param amount - The amount to format ex. '2.43'
 * @returns A string like "$10.99"
 */
export const formatPrice = (symbol: string, amount: number): string => {
    return `${symbol}${amount.toFixed(2)}`;
};
