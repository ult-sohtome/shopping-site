async function getRateForYen(): Promise<number> {
  const apiResponse = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
  const data = await apiResponse.json();
  return data.usd.jpy;
}

export async function convertToYen(priceInDollar: number): Promise<number> {
  const rate = await getRateForYen();
  return Math.round(priceInDollar * rate);
}