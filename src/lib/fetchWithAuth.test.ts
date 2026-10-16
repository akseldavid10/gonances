import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { fetchWithAuth } from "./fetchWithAuth";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("simultaneous GETs share one request and have independently readable bodies", async () => {
  let calls = 0;
  let complete!: (response: Response) => void;
  globalThis.fetch = () => {
    calls += 1;
    return new Promise<Response>((resolve) => {
      complete = resolve;
    });
  };
  const first = fetchWithAuth("/api/v1/categories", { cache: "no-store" });
  const second = fetchWithAuth("/api/v1/categories", { cache: "no-store" });
  assert.equal(calls, 1);
  complete(Response.json({ items: [{ id: "category" }] }));
  const responses = await Promise.all([first, second]);
  assert.deepEqual(await responses[0].json(), { items: [{ id: "category" }] });
  assert.deepEqual(await responses[1].json(), { items: [{ id: "category" }] });
});

test("a successful write invalidates an old GET without removing its new replacement", async () => {
  const pending: ((response: Response) => void)[] = [];
  globalThis.fetch = (_input, init) => {
    if (init?.method === "PUT")
      return Promise.resolve(Response.json({ ok: true }));
    return new Promise<Response>((resolve) => pending.push(resolve));
  };
  const old = fetchWithAuth("/api/v1/transactions?page=1");
  await fetchWithAuth("/api/v1/users/me", { method: "PUT", body: "{}" });
  const fresh = fetchWithAuth("/api/v1/transactions?page=1");
  assert.equal(pending.length, 2);
  pending[0](Response.json({ currency: "USD" }));
  assert.equal((await (await old).json()).currency, "USD");
  const shared = fetchWithAuth("/api/v1/transactions?page=1");
  assert.equal(pending.length, 2);
  pending[1](Response.json({ currency: "COP" }));
  for (const response of await Promise.all([fresh, shared])) {
    assert.equal((await response.json()).currency, "COP");
  }
});

test("concurrent 401s share one refresh and one replay of the same GET", async () => {
  let reads = 0;
  let refreshes = 0;
  let refreshed = false;
  let completeRefresh!: (response: Response) => void;
  globalThis.fetch = async (input) => {
    if (String(input) === "/api/v1/auth/refresh") {
      refreshes += 1;
      return new Promise<Response>((resolve) => {
        completeRefresh = resolve;
      });
    }
    reads += 1;
    return Response.json({ ok: refreshed }, { status: refreshed ? 200 : 401 });
  };
  const requests = [
    fetchWithAuth("/api/private"),
    fetchWithAuth("/api/private"),
  ];
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(refreshes, 1);
  refreshed = true;
  completeRefresh(Response.json({ ok: true }));
  assert.deepEqual(
    (await Promise.all(requests)).map((r) => r.status),
    [200, 200],
  );
  assert.equal(reads, 2);
  assert.equal(refreshes, 1);
});

test("failed GETs do not prevent a later retry", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    if (++calls === 1) throw new Error("Network unavailable");
    return Response.json({ ok: true });
  };
  await assert.rejects(fetchWithAuth("/api/retry"), /Network unavailable/);
  assert.equal((await fetchWithAuth("/api/retry")).status, 200);
  assert.equal(calls, 2);
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
