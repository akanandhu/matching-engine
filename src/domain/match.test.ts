import { describe, expect, it } from "vitest";
import type { LimitOrder } from "./types.js";
import { canCross, executionQuantity } from "./match.js";

function makeLimitOrder(overrides: Partial<LimitOrder>): LimitOrder {
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

describe("canCross", () => {
  it("does not cross when buy price is less than sell price", () => {
    const buy: LimitOrder = makeLimitOrder({
      price: 100,
      side: "buy",
    });

    const sell: LimitOrder = makeLimitOrder({
      id: "2",
      price: 150,
      side: "sell",
    });

    expect(canCross(buy, sell)).toBe(false);
  });

  it("crosses when buy and sell prices are equal", () => {
    const buy: LimitOrder = makeLimitOrder({
      price: 100,
      side: "buy",
    });

    const sell: LimitOrder = makeLimitOrder({
      id: "2",
      price: 100,
      side: "sell",
    });
    expect(canCross(buy, sell)).toBe(true);
  });

  it("crosses when buy price is higher than sell price", () => {
    const buy: LimitOrder = makeLimitOrder({
      price: 150,
      side: "buy",
    });

    const sell: LimitOrder = makeLimitOrder({
      id: "2",
      price: 100,
      side: "sell",
    });
    expect(canCross(buy, sell)).toBe(true);
  });
});

describe("executionQuantity", () => {
  it("when buy and sell remaining quantities are equal", () => {
    const buy: LimitOrder = makeLimitOrder({
      remainingQty: 100,
      side: "buy",
    });
    const sell: LimitOrder = makeLimitOrder({
      remainingQty: 100,
      side: "sell",
    });
    expect(executionQuantity(buy, sell)).toBe(buy.remainingQty);
  });

  it("when buy remaining quantity is greater than sell remaining quantity", () => {
    const buy: LimitOrder = makeLimitOrder({
      remainingQty: 150,
      side: "buy",
    });
    const sell: LimitOrder = makeLimitOrder({
      remainingQty: 100,
      side: "sell",
    });
    expect(executionQuantity(buy, sell)).toBe(sell.remainingQty);
  });

  it("when sell remaining quantity is greater than buy remaining quantity", () => {
    const buy: LimitOrder = makeLimitOrder({
      remainingQty: 150,
      side: "buy",
    });
    const sell: LimitOrder = makeLimitOrder({
      remainingQty: 200,
      side: "sell",
    });
    expect(executionQuantity(buy, sell)).toBe(buy.remainingQty);
  });
});
