Usage:

import { Log } from "./Logging Middleware/src/index.js";

await Log({
  stack: "frontend",
  level: "info",
  pkg: "api",
  message: "Created short link",
  creds: { email, name, rollNo, accessCode, clientID, clientSecret }
});
