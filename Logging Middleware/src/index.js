import { getAuthToken } from "./auth.js";

const BASE = "http://20.244.56.144/evaluation-service";
const STACK = ["frontend", "backend"];
const LEVEL = ["debug", "info", "warn", "error", "fatal"];
const PKG = ["api","component","hook","page","state","style","auth","config","middleware","utils"]; // frontend-allowed

export async function Log({ stack, level, pkg, message, creds }) {
  try {
    // normalize and validate against allowed lowercase values
    stack = String(stack || "").toLowerCase();
    level = String(level || "").toLowerCase();
    pkg = String(pkg || "").toLowerCase();

    if (!STACK.includes(stack) || !LEVEL.includes(level) || !PKG.includes(pkg)) {
      console.warn("Log dropped: invalid fields", { stack, level, pkg });
      return;
    }

    const token = await getAuthToken(creds /* or CREDS */);

    const res = await fetch(`${BASE}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    if (!res.ok) {
      console.warn("Log failed", res.status, await res.text());
      return;
    }
    return await res.json(); // { logID, message }
  } catch (e) {
    console.warn("Log error", e?.message || e);
  }
}
