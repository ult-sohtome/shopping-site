export function convertToYen(priceInDollar: number, rate = 140): number {
  return Math.round(priceInDollar * rate);
}