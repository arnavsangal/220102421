import { BASE } from "./constants.js";
export async function postLogs(token, body) {
  const res = await fetch(`${BASE}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body)
  });
  return res;
}
