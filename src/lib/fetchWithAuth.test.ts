import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { fetchWithAuth } from "./fetchWithAuth";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("does not refresh or replay an authenticated validation error", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (input) => {
    calls.push(String(input));
    return Response.json({ code: "CURRENT_PASSWORD_INVALID" }, { status: 403 });
  };

  const response = await fetchWithAuth("/api/v1/users/me/password", {
    method: "PUT",
    body: "{}",
  });
  assert.equal(response.status, 403);
  assert.deepEqual(calls, ["/api/v1/users/me/password"]);
});

test("refreshes once and replays a request after a session 401", async () => {
  const calls: string[] = [];
  let protectedCalls = 0;
  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url === "/api/v1/auth/refresh") return Response.json({ ok: true });
    protectedCalls += 1;
    return protectedCalls === 1
      ? Response.json({ code: "SESSION_EXPIRED" }, { status: 401 })
      : Response.json({ ok: true });
  };

  const response = await fetchWithAuth("/api/private");
  assert.equal(response.status, 200);
  assert.deepEqual(calls, [
    "/api/private",
    "/api/v1/auth/refresh",
    "/api/private",
  ]);
});

test("does not replay the request when refresh has a server failure", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    return url === "/api/v1/auth/refresh"
      ? Response.json({}, { status: 503 })
      : Response.json({}, { status: 401 });
  };

  const response = await fetchWithAuth("/api/private");
  assert.equal(response.status, 401);
  assert.deepEqual(calls, ["/api/private", "/api/v1/auth/refresh"]);
});
