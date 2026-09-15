import type { LimitOrder } from "./types.ts";

export function canCross(buy: LimitOrder, sell: LimitOrder): boolean {
  return buy.price >= sell.price;
}

export function executionQuantity(buy: LimitOrder, sell: LimitOrder): number {
  return Math.min(buy.remainingQty, sell.remainingQty);
}

export function executionPrice(
  resting: LimitOrder,
): number {
  return resting.price;
}
