import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isValidTransactionDescription,
  parseTransactionAmount,
} from "./transaction-validation";

test("amount accepts strict positive decimal syntax before currency conversion", () => {
  assert.equal(parseTransactionAmount(12.34), "12.34");
  assert.equal(parseTransactionAmount("0.01"), "0.01");
  assert.equal(parseTransactionAmount(99_999_999.99), "99999999.99");
  assert.equal(parseTransactionAmount(12.345), null);
  assert.equal(parseTransactionAmount("0.009"), null);
  assert.equal(parseTransactionAmount("1e2"), null);
  assert.equal(parseTransactionAmount("0x10"), null);
  assert.equal(parseTransactionAmount("+12"), null);
  assert.equal(parseTransactionAmount(0), null);
  assert.equal(parseTransactionAmount(-1), null);
  assert.equal(parseTransactionAmount(Number.NaN), null);
  assert.equal(parseTransactionAmount(Number.POSITIVE_INFINITY), null);
  assert.equal(parseTransactionAmount(100_000_000), "100000000");
  assert.equal(
    parseTransactionAmount("999999999999999.99"),
    "999999999999999.99",
  );
  assert.equal(parseTransactionAmount("1000000000000000"), null);
  assert.equal(parseTransactionAmount(" "), null);
  assert.equal(parseTransactionAmount({}), null);
});

test("description is optional but limited to 200 characters", () => {
  assert.equal(isValidTransactionDescription(undefined), true);
  assert.equal(isValidTransactionDescription(null), true);
  assert.equal(isValidTransactionDescription("nota"), true);
  assert.equal(isValidTransactionDescription("x".repeat(201)), false);
  assert.equal(isValidTransactionDescription(42), false);
});
