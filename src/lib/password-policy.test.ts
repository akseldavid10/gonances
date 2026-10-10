import assert from "node:assert/strict";
import { test } from "node:test";
import { isStrongPassword } from "./password-policy";

test("password policy aligns account creation and authenticated changes", () => {
  assert.equal(isStrongPassword("Abcdefg1"), true);
  assert.equal(isStrongPassword("abcdefg1"), false);
  assert.equal(isStrongPassword("Abcdefgh"), false);
  assert.equal(isStrongPassword("Ab1"), false);
  assert.equal(isStrongPassword("A1".repeat(40)), false);
  assert.equal(isStrongPassword(null), false);
});
