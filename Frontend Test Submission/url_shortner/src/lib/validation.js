export function isValidUrl(v) {
  try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; }
  catch { return false; }
}
export function isValidMinutes(v) {
  if (v === "" || v == null) return true;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 && n <= 60 * 24 * 30;
}
export function isValidShortcode(v) {
  if (!v) return true;
  return /^[a-zA-Z0-9-_]{3,20}$/.test(v);
}
