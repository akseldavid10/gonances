import assert from "node:assert/strict";
import test from "node:test";
import { providerFailure, providerRates } from "./exchange-rate-provider";

const rates = { USD: 1, EUR: 0.9, JPY: 150, GBP: 0.75, COP: 4000 };

test("provider diagnostics identify known failures without echoing private data", () => {
  assert.match(providerFailure({ "error-type": "invalid-key" }), /llave/);
  assert.match(providerFailure({ "error-type": "quota-reached" }), /cuota/);
  assert.match(
    providerFailure({ "error-type": "inactive-account" }),
    /activada/,
  );
  const privateValue = "https://provider.test/secret-key";
  assert.equal(
    providerFailure({ "error-type": privateValue, message: privateValue }),
    providerFailure(null),
  );
});

test("accepts Standard API conversion_rates and preserves all supported rates", () => {
  assert.deepEqual(
    providerRates({
      result: "success",
      base_code: "USD",
      conversion_rates: rates,
    }),
    {
      USD: "1",
      EUR: "0.9",
      JPY: "150",
      GBP: "0.75",
      COP: "4000",
    },
  );
});

test("retains compatibility with the Open Access rates payload", () => {
  assert.equal(
    providerRates({ result: "success", base_code: "USD", rates })?.COP,
    "4000",
  );
});

test("rejects errors, wrong bases, missing rates and invalid values", () => {
  assert.equal(
    providerRates({ result: "error", "error-type": "invalid-key" }),
    null,
  );
  assert.equal(
    providerRates({
      result: "success",
      base_code: "EUR",
      conversion_rates: rates,
    }),
    null,
  );
  for (const COP of [undefined, 0, -1, Infinity, NaN, "4000"]) {
    assert.equal(
      providerRates({
        result: "success",
        base_code: "USD",
        conversion_rates: { ...rates, COP },
      }),
      null,
    );
  }
});
