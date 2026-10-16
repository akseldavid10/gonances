import assert from "node:assert/strict";
import test from "node:test";
import { databaseUrl } from "./database-url";

test("legacy SSL aliases keep full certificate verification without changing credentials", () => {
  for (const mode of ["prefer", "require", "verify-ca"]) {
    const input = `postgresql://user:p%40ss@db.example/app?sslmode=${mode}&channel_binding=require`;
    const result = new URL(databaseUrl(input));
    assert.equal(result.searchParams.get("sslmode"), "verify-full");
    assert.equal(result.password, "p%40ss");
    assert.equal(result.searchParams.get("channel_binding"), "require");
  }
});

test("local databases and explicit SSL policies are preserved", () => {
  for (const suffix of [
    "",
    "?sslmode=disable",
    "?sslmode=verify-full",
    "?sslmode=require&uselibpqcompat=true",
  ]) {
    const input = `postgresql://localhost/app${suffix}`;
    assert.equal(databaseUrl(input), input);
  }
});
