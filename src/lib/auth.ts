import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// The client connects lazily, so importing this file never fails the build.
const client = new MongoClient(
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017",
);
const db = client.db(process.env.MONGODB_DB ?? "bazardor");

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// FIX: the base URL used to be fixed to BETTER_AUTH_URL (http://localhost:3000).
// After Google/GitHub login the user was sent back to that address and the
// session cookie was set for the wrong host, so the site never saw the login.
// Now the URL follows the host the user is really on (localhost, Vercel, or
// your own domain), and BETTER_AUTH_URL is only the fallback.
function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).host;
  } catch {
    return null;
  }
}

const fallbackURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const allowedHosts = Array.from(
  new Set(
    [
      hostOf(fallbackURL),
      hostOf(process.env.VERCEL_URL),
      hostOf(process.env.VERCEL_PROJECT_PRODUCTION_URL),
      "localhost:3000",
      "127.0.0.1:3000",
      "*.vercel.app",
    ].filter((h): h is string => Boolean(h)),
  ),
);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: { allowedHosts, fallback: fallbackURL },
  trustedOrigins: allowedHosts.map((h) =>
    h.startsWith("localhost") || h.startsWith("127.") ? `http://${h}` : `https://${h}`,
  ),
  advanced: { trustedProxyHeaders: true },
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    // After sign up the user is sent to the sign in page (see assignment guideline).
    autoSignIn: false,
    minPasswordLength: 8,
  },
  socialProviders,
  // FIX for "account_not_linked": same email used with Google, GitHub or password
  // is linked to ONE user instead of being rejected.
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      // The app has no email-verification step, so the old email/password user
      // is never "verified". Without this, linking is always blocked.
      requireLocalEmailVerified: false,
    },
  },
  plugins: [nextCookies()],
});
