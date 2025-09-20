const BASE = "http://20.244.56.144/evaluation-service";
let tokenCache = null;
let expiresAt = 0;

export async function getAuthToken(creds) {
  const now = Date.now();
  if (tokenCache && now < expiresAt - 60_000) return tokenCache;

  const res = await fetch(`${BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds)
  });
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
  const data = await res.json();
  tokenCache = `${data.token_type} ${data.access_token}`;
  expiresAt = now + (data.expires_in ?? 3600) * 1000;
  return tokenCache;
}
