import { headers } from "next/headers";
import { auth } from "./auth";

/** Returns the current session on the server, or null when signed out. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
