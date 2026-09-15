export type OrderSide = "buy" | "sell";

export type BaseOrder = {
  id: string;
  side: OrderSide;
  quantity: number;
  remainingQty: number;
};

export type MarketOrder = BaseOrder & {
  type: "market";
};

export type LimitOrder = BaseOrder & {
  type: "limit";
  price: number;
};

export type Order = MarketOrder | LimitOrder;

export type OrderBook = {
  bids: LimitOrder[];
  asks: LimitOrder[];
};
