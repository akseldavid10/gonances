import assert from "node:assert/strict";
import { test } from "node:test";
import {
  convertedNumber,
  currencyToUsd,
  usdToCurrency,
} from "./currency-conversion";

test("converts from canonical USD in both directions", () => {
  assert.equal(usdToCurrency("100", "0.92").toString(), "92");
  assert.equal(currencyToUsd("92", "0.92").toString(), "100");
  assert.equal(convertedNumber("2.5", "4000"), 10_000);
});

test("uses half-up rounding at the currency boundary", () => {
  assert.equal(usdToCurrency("1.005", "1").toString(), "1.01");
  assert.equal(currencyToUsd("1", "3").toString(), "0.33");
  assert.equal(currencyToUsd("0.01", "4000").toString(), "0");
});
