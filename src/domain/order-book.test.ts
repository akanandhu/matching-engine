import { describe, expect, it } from "vitest";
import { OrderBook } from "./order-book.js";
import { makeLimitOrder } from "./utils.js";

describe("OrderBook", () => {
  it("empty book", () => {
    const book = new OrderBook();
    expect(book.bestAsk()).toBeUndefined();
    expect(book.bestBid()).toBeUndefined();
  });

  it("place 3 bids and check best bid", () => {
    const book = new OrderBook();
    book.add(
      makeLimitOrder({
        price: 100,
        side: "buy",
      }),
    );

    book.add(
      makeLimitOrder({
        price: 105,
        side: "buy",
      }),
    );

    book.add(
      makeLimitOrder({
        price: 102,
        side: "buy",
      }),
    );

    expect(book.bestBid()?.price).toBe(105);
  });

  it("place 3 asks and check best ask", () => {
    const book = new OrderBook();
    book.add(
      makeLimitOrder({
        price: 110,
        side: "sell",
      }),
    );

    book.add(
      makeLimitOrder({
        price: 105,
        side: "sell",
      }),
    );

    book.add(
      makeLimitOrder({
        price: 108,
        side: "sell",
      }),
    );

    expect(book.bestAsk()?.price).toBe(105);
  });

  it("gives priority to the earliest bid when prices are equal", () => {
    const book = new OrderBook();
    book.add(
      makeLimitOrder({
        id: "A",
        price: 100,
        side: "buy",
      }),
    );

    book.add(
      makeLimitOrder({
        id: "B",
        price: 100,
        side: "buy",
      }),
    );

    book.add(
      makeLimitOrder({
        id: "C",
        price: 100,
        side: "buy",
      }),
    );

    expect(book.bestBid()?.id).toBe("A");
  });

  it("gives priority to the earliest ask when prices are equal", () => {
    const book = new OrderBook();
    book.add(
      makeLimitOrder({
        id: "A",
        price: 100,
        side: "sell",
      }),
    );

    book.add(
      makeLimitOrder({
        id: "B",
        price: 100,
        side: "sell",
      }),
    );

    book.add(
      makeLimitOrder({
        id: "C",
        price: 100,
        side: "sell",
      }),
    );
    expect(book.bestAsk()?.id).toBe("A");
  });

  it("remove existing buy order", () => {
    const book = new OrderBook();
    book.add(makeLimitOrder({ id: "A", side: "buy" }));
    expect(book.remove("A", "buy")).toBe(true);
  })

  it("remove existing sell order", () => {
    const book = new OrderBook();
    book.add(makeLimitOrder({ id: "A", side: "sell" }));
    expect(book.remove("A", "sell")).toBe(true);
  })

  it("remove unknown order", () => {
    const book = new OrderBook();
    expect(book.remove("A", "buy")).toBe(false);
  })

  it("remove an order and check change in best bid", () => {
    const book = new OrderBook();
    book.add(makeLimitOrder({ id: "B1", price: 105, side: "buy" }));
    book.add(makeLimitOrder({ id: "B2", price: 100, side: "buy" }));

    expect(book.bestBid()?.id).toBe("B1");
    expect(book.remove("B1", "buy")).toBe(true);
    expect(book.bestBid()?.id).toBe("B2");
})
});
