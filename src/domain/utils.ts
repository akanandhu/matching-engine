import type { LimitOrder } from "./types.js";

export function makeLimitOrder(overrides: Partial<LimitOrder>): LimitOrder {
  return {
    id: "1",
    type: "limit",
    price: 100,
    quantity: 10,
    remainingQty: 10,
    side: "buy",
    ...overrides,
  };
}