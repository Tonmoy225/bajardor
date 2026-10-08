import { createAuthClient } from "better-auth/react";

// Same-origin requests: no baseURL needed, works on localhost and on Vercel previews.
export const authClient = createAuthClient();
