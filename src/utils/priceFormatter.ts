export function convertToYen(priceInDollar: number, rate: number): number {
  return Math.round(priceInDollar * rate);
}