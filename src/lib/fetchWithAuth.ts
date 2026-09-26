let refreshRequest: Promise<Response> | null = null;

function refreshAccessToken(): Promise<Response> {
  if (!refreshRequest) {
    refreshRequest = fetch("/api/v1/auth/refresh", {
      method: "POST",
    }).finally(() => {
      refreshRequest = null;
    });
  }

  return refreshRequest;
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const response = await fetch(input, {
    ...init,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshResponse = await refreshAccessToken();

  if (!refreshResponse.ok) {
    return response;
  }

  return fetch(input, {
    ...init,
  });
}
