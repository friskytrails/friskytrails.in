# Show your main domain on Google OAuth consent screen

If the "Choose an account" screen shows **friskytrails-in-oine.vercel.app** (or another Vercel URL) instead of your main domain (e.g. **friskytrails.in**), do the following.

## 1. Google Cloud Console (consent screen text)

The domain and links shown on the consent screen are set in Google, not in this app.

1. Open [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **OAuth consent screen**.
2. Click **Edit app**.
3. Set:
   - **Application home page**: `https://friskytrails.in` (or your main domain)
   - **Application privacy policy link**: `https://friskytrails.in/privacy` (or your real URL)
   - **Application terms of service link**: `https://friskytrails.in/terms` (or your real URL)
4. Under **Authorized domains**, add:
   - `friskytrails.in`
   - (and your backend domain if required, e.g. `frisky-trails-backend.vercel.app`)
5. Save.

After publishing, the consent screen will show your main domain and links.

## 2. Backend environment (production)

Set these in your **production** backend env (e.g. Vercel project env vars), not the Vercel deployment URL:

- **CLIENT_URL** = `https://friskytrails.in`  
  (so after Google login users are redirected to your main site, not a Vercel subdomain)
- **CORS_ORIGIN** = `https://friskytrails.in`
- **API_URL** = your backend URL, e.g. `https://frisky-trails-backend.vercel.app`

In **Credentials** → your OAuth 2.0 Client → **Authorized redirect URIs**, keep the **backend** callback URL, e.g.:

- `https://frisky-trails-backend.vercel.app/api/v1/user/google/callback`

Do not use the frontend domain as the redirect URI; the backend must receive the callback and then redirect to `CLIENT_URL`.

---

## 3. Put backend on your domain (api.friskytrails.in)

So the OAuth redirect URI is on your domain and Google shows **api.friskytrails.in** instead of the Vercel URL.

### Step 1: Add domain in Vercel (backend project)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → select the **backend** project (the one that currently has `friskytrails-in-oine.vercel.app` or similar).
2. Go to **Settings** → **Domains**.
3. Click **Add** and enter: `api.friskytrails.in`
4. Vercel will show the DNS record you need (usually a **CNAME**):
   - **Name/host:** `api` (or `api.friskytrails.in` depending on your DNS provider)
   - **Value/target:** `cname.vercel-dns.com`

### Step 2: Add DNS record where friskytrails.in is managed

Where you manage DNS for **friskytrails.in** (e.g. GoDaddy, Namecheap, Cloudflare, Vercel Domains):

1. Add a **CNAME** record:
   - **Name:** `api` (so it becomes api.friskytrails.in)
   - **Value / Target:** `cname.vercel-dns.com`
2. Save. DNS can take a few minutes to propagate (up to 48h, often 5–15 min).

### Step 3: Confirm in Vercel

- Back in Vercel → **Settings** → **Domains**, wait until **api.friskytrails.in** shows as verified (green).
- If it asks for an A record instead, use the IP Vercel gives you.

### Step 4: Backend environment variables (Vercel)

In the **same backend project** → **Settings** → **Environment Variables**, set (for Production, or All):

| Variable | Value |
|----------|--------|
| **API_URL** | `https://api.friskytrails.in` |
| **GOOGLE_REDIRECT_URI** | `https://api.friskytrails.in/api/v1/user/google/callback` |
| **CLIENT_URL** | `https://www.friskytrails.in` |
| **CORS_ORIGIN** | `https://www.friskytrails.in` |

Redeploy the backend after changing env vars (Deployments → … → Redeploy).

### Step 5: Google Cloud Console

1. **APIs & Services** → **Credentials** → your OAuth 2.0 Client ID.
2. Under **Authorized redirect URIs**, add:
   - `https://api.friskytrails.in/api/v1/user/google/callback`
   - You can keep the old Vercel callback during testing, then remove it.
3. **OAuth consent screen** → **Authorized domains** must include:
   - `friskytrails.in` (this covers api.friskytrails.in).

After this, the redirect URI is on your domain and Google will show **api.friskytrails.in** in the flow.

### Step 6: Frontend (optional but recommended)

So the site uses your API domain for all requests (including “Login with Google”):

- In your **frontend** Vercel project → **Settings** → **Environment Variables**, set:
  - **VITE_API_URL_PROD** = `https://api.friskytrails.in`
- Redeploy the frontend. Then “Login with Google” will go to `https://api.friskytrails.in/api/v1/user/google` and the callback will be on the same domain.
