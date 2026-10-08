/** Maps Better Auth error codes to Bangla messages. Falls back to the server message. */
const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়",
  USER_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক দীর্ঘ",
  PROVIDER_NOT_FOUND: "এই সোশ্যাল লগইন এখনো চালু করা হয়নি",
};

export function authErrorMessage(
  error: { code?: string; message?: string } | null | undefined,
  fallback = "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন",
) {
  if (error?.code && MESSAGES[error.code]) return MESSAGES[error.code];
  return error?.message || fallback;
}

/** Only allow same-site relative paths as post-login redirect targets. */
export function safeRedirect(path?: string | null) {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}
