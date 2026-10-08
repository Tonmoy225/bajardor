<div align="center">

# 🛒 বাজার দর · BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
A Bangla-first daily grocery price tracker for Bangladesh — compare rice, pulses, oil, vegetables, fish, meat, dairy and spices across markets, and see what got more expensive or cheaper today.

[Live Demo](#) · [Repository](#) · Assignment: Programming Hero **B14-A7**

</div>

---

## ✨ Key Features

1. **Live price ticker & daily movers** – an infinite-scrolling marquee of today's prices, plus "আজ দাম বেড়েছে ▲" and "আজ দাম কমেছে ▼" sections showing the top 6 risers and fallers.
2. **Full product catalogue** – all 33 products as responsive cards (emoji, name, unit, today's price in Bengali digits, and a red/green/gray change badge).
3. **Category pages with smart sorting** – skeleton loading, a friendly empty/404 state, and a **সাজান** dropdown (ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম) that sorts by *numeric value* and handles Bengali numerals correctly.
4. **Protected product details** – sign-in required. Shows the min / max / average price, price history (yesterday, last week, last month) and a **market-wise price table** across divisions.
5. **Authentication with Better Auth** – email + password, Google and GitHub login, toast notifications for success / errors / logout / protected-route redirects.
6. **My Profile & Update Information** – view your account, then update your name on a dedicated route using Better Auth's `updateUser`.
7. **Fully responsive & resilient** – mobile, tablet and desktop layouts; automatic fallback to the backup API; custom 404 page; reload-safe dynamic routes.

## 🧰 Technologies Used

| Purpose | Tech |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) + React 19 |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/) (custom `bazar` theme) |
| Authentication | [Better Auth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | MongoDB (via Better Auth's MongoDB adapter) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Data | BazarDor REST API (with automatic fallback to the alternative base URL) |
| Fonts | Noto Sans Bengali, Inter |

## 🗺️ Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Hero, risers, fallers, all products | Public |
| `/category/[slug]` | Category products with sort control | Public |
| `/product/[slug]` | Price summary + market-wise table | 🔒 Signed-in |
| `/signin`, `/signup` | Authentication | Public |
| `/profile` | My profile | 🔒 Signed-in |
| `/profile/update` | Update name | 🔒 Signed-in |
| `*` | Friendly 404 with "হোম পেজে ফিরে যান" | Public |

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local   # then fill in the values (see below)

# 3. Run
npm run dev                  # http://localhost:3000
```

Production build: `npm run build && npm start`.

### Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | ✅ | Random 32+ char string (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | ✅ | `http://localhost:3000` locally, your deployed URL in production |
| `MONGODB_URI` | ✅ | MongoDB Atlas (free tier) connection string |
| `MONGODB_DB` | – | Database name, defaults to `bazardor` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | for Google login | Callback: `{BETTER_AUTH_URL}/api/auth/callback/google` |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | for GitHub login | Callback: `{BETTER_AUTH_URL}/api/auth/callback/github` |
| `API_BASE_URL_1` / `API_BASE_URL_2` | – | Default to the two public BazarDor API hosts |

> Email/password login works with just the first three variables. Social buttons show a friendly error until their credentials are added.

### Deploying to Vercel

1. Import the repo into Vercel and add the environment variables above.
2. Set `BETTER_AUTH_URL` to your production URL (e.g. `https://bazar-dor.vercel.app`).
3. In MongoDB Atlas → *Network Access*, allow `0.0.0.0/0` (Vercel uses dynamic IPs).
4. Add the production callback URLs to your Google and GitHub OAuth apps.

Dynamic routes (`/product/[slug]`, `/category/[slug]`) are rendered on demand, so reloading any page never produces a hard 404.

## 📁 Project Structure

```
src/
├─ app/                  # App Router pages (home, category, product, auth, profile, 404)
├─ components/           # Header, ticker, product cards, forms, skeletons…
└─ lib/
   ├─ api.ts             # API client with BASE_URL_1 → BASE_URL_2 fallback
   ├─ bn.ts              # Bengali digits, prices, units and date helpers
   ├─ sort.ts            # Numeric price sorting
   ├─ auth.ts            # Better Auth server config (MongoDB)
   └─ auth-client.ts     # Better Auth React client
```

## 📝 Notes

- Price colours follow the Figma design: a price **rise** is red ▲, a **fall** is green ▼. Swap them in `src/lib/ui.ts` if you prefer the opposite.
- All prices are indicative — *সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।*

---

<div align="center">Built by <a href="https://github.com/Tonmoy225">Tonmoy</a> for Programming Hero · Assignment 07</div>
