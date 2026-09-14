export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  let response = await fetch(input, {
    ...init,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshResponse = await fetch("/api/v1/auth/refresh", {
    method: "POST",
  });

  if (!refreshResponse.ok) {
    return response;
  }

  return fetch(input, {
    ...init,
  });
}
