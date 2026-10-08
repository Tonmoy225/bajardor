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
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    // After sign up the user is sent to the sign in page (see assignment guideline).
    autoSignIn: false,
    minPasswordLength: 8,
  },
  socialProviders,
  plugins: [nextCookies()],
});
