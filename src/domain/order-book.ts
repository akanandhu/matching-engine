import type { LimitOrder } from "./types.js";

export class OrderBook {
  private bids: LimitOrder[] = [];
  private asks: LimitOrder[] = [];

  add(order: LimitOrder): void {
    if (order.side === "buy") {
      this.bids.push(order);
    } else {
      this.asks.push(order);
    }
  }

  bestBid(): LimitOrder | undefined {
    if (this.bids.length === 0) {
      return undefined;
    }
   return this.bids.reduce((prev, curr) => {
      return prev.price >= curr.price ? prev : curr;
    });
  }

  bestAsk(): LimitOrder | undefined {
    if (this.asks.length === 0) {
      return undefined;
    }
   return this.asks.reduce((prev, curr) => {
      return prev.price <= curr.price ? prev : curr;
    });
  }
}
