import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Returns the current session on the server, or null when signed out. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Protected-route guard. Redirects to /signin (which shows a toast) and brings
 * the user back to `path` after a successful login.
 */
export async function requireSession(path: string) {
  const session = await getSession().catch(() => null);
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(path)}&reason=login-required`);
  }
  return session;
}
