import { STACK, LEVEL, PKG_FRONTEND } from "./constants.js";
export function isValid({ stack, level, pkg }) {
  return STACK.includes(stack) && LEVEL.includes(level) && PKG_FRONTEND.includes(pkg);
}
