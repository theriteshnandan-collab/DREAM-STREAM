# 🔐 Brick 3: Clerk Authentication Setup

**We need to know WHO is saving the dream.**
Follow these steps to set up secure login.

---

## 1. Create Project
1.  Go to [dashboard.clerk.com](https://dashboard.clerk.com/sign-up).
2.  Sign up (Free).
3.  Click **"Create Application"**.
4.  Name: `DreamStream`.
5.  Select **"Google"** and **"Email"** as login methods.
6.  Click **"Create Application"**.

---

## 2. Get API Keys
1.  You will land on the **"API Keys"** page immediately.
2.  Copy **Publishable Key**.
3.  Copy **Secret Key**.
4.  Open your `.env.local` file.
5.  Add them at the bottom:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## ✅ Action Required
**Paste the keys into `.env.local` and save.**
Then tell me "KEYS SAVED".

(I am installing the code library in the background while you do this).
