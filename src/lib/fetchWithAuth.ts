let refreshRequest: Promise<boolean> | null = null;
const pendingGetRequests = new Map<string, Promise<Response>>();
const AUTH_CHANNEL = "gonances-auth";
const REFRESH_GENERATION_KEY = "gonances-refresh-generation";

function requestMethod(input: RequestInfo | URL, init?: RequestInit) {
  return (
    init?.method ?? (input instanceof Request ? input.method : "GET")
  ).toUpperCase();
}

async function performFetch(input: RequestInfo | URL, init?: RequestInit) {
  if (requestMethod(input, init) !== "GET") return fetch(input, init);

  const url =
    input instanceof Request
      ? input.url
      : input instanceof URL
        ? input.toString()
        : input;
  const headers = new Headers(
    input instanceof Request ? input.headers : undefined,
  );
  new Headers(init?.headers).forEach((value, key) => {
    headers.set(key, value);
  });
  const key = `${url}\n${[...headers.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${name}:${value}`)
    .join("\n")}`;
  let pending = pendingGetRequests.get(key);
  if (!pending) {
    pending = fetch(input, init).finally(() => pendingGetRequests.delete(key));
    pendingGetRequests.set(key, pending);
  }
  return (await pending).clone();
}

function generation() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(REFRESH_GENERATION_KEY) ?? "";
}

function publish(type: "refresh-success" | "session-expired" | "logout") {
  if (typeof window === "undefined") return;
  const value = `${Date.now()}:${crypto.randomUUID()}`;
  if (type === "refresh-success") {
    window.localStorage.setItem(REFRESH_GENERATION_KEY, value);
  }
  const channel = new BroadcastChannel(AUTH_CHANNEL);
  channel.postMessage({ type, generation: value });
  channel.close();
}

async function requestRefresh() {
  const response = await fetch("/api/v1/auth/refresh", { method: "POST" });
  if (response.ok) {
    publish("refresh-success");
    return true;
  }
  if (response.status === 401) publish("session-expired");
  return false;
}

export function refreshSession(): Promise<boolean> {
  if (refreshRequest) return refreshRequest;
  const knownGeneration = generation();
  refreshRequest = (async () => {
    if (typeof navigator !== "undefined" && navigator.locks) {
      return navigator.locks.request("gonances-auth-refresh", async () => {
        if (generation() !== knownGeneration) return true;
        return requestRefresh();
      });
    }
    return requestRefresh();
  })().finally(() => {
    refreshRequest = null;
  });
  return refreshRequest;
}

export async function logoutSession() {
  const run = async () => {
    const response = await fetch("/api/v1/auth/logout", { method: "POST" });
    if (response.ok) publish("logout");
    return response;
  };
  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request("gonances-auth-refresh", run);
  }
  return run();
}

export function subscribeToSessionEnd(callback: () => void) {
  const channel = new BroadcastChannel(AUTH_CHANNEL);
  channel.addEventListener("message", (event) => {
    if (
      event.data?.type === "logout" ||
      event.data?.type === "session-expired"
    ) {
      callback();
    }
  });
  return () => channel.close();
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const firstInput = input instanceof Request ? input.clone() : input;
  const retryInput = input instanceof Request ? input.clone() : input;
  const response = await performFetch(firstInput, init);
  if (response.status !== 401 || !(await refreshSession())) return response;
  return performFetch(retryInput, init);
}
