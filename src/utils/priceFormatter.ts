export function convertToYen(priceInDollar: number, rate: number): number {
  return Math.round(priceInDollar * rate);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString();
}