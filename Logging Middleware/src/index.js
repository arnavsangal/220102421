import { getAuthToken } from "./auth.js";
import { isValid } from "./validators.js";

export async function Log({ stack, level, pkg, message, creds }) {
  // Enforce lowercase inputs and allowed values
  stack = String(stack || "").toLowerCase();
  level = String(level || "").toLowerCase();
  pkg = String(pkg || "").toLowerCase();

  if (!isValid({ stack, level, pkg })) {
    console.warn("Invalid log fields", { stack, level, pkg });
    return;
  }

  try {
    const token = await getAuthToken(creds);
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
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
    console.warn("Log error", e.message);
  }
}
