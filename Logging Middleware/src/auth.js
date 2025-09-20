import { BASE } from "./constants.js";

let tokenCache = null;
let expiry = 0;

export async function getAuthToken(creds) {
  const now = Date.now();
  if (tokenCache && now < expiry - 60_000) return tokenCache;

  const res = await fetch(`${BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds)
  });
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
  const data = await res.json();
  tokenCache = `${data.token_type} ${data.access_token}`;
  // Optional expires_in present; default to 1 hour if missing
  expiry = now + ((data.expires_in ?? 3600) * 1000);
  return tokenCache;
}
