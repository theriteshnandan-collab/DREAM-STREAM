# 🌙 DreamStream: The "Brick by Brick" Roadmap

**Goal:** A fully functional, zero-cost SaaS.

---

## 🧱 BRICK 1: The Core Engine (✅ DONE)
- [x] **UI Shell:** Dark mode, animations (Framer Motion).
- [x] **Logic:** Mock API connected to Frontend.
- [x] **AI:** Free Image Generation (Pollinations) + Keyword Analysis.
- **Status:** *Working Locally.*

---

## 🧱 BRICK 2: The Memory (Database) 🚧 **[NEXT]**
**Goal:** Save dreams so they don't disappear when you refresh.
- [ ] Create a free Supabase project.
- [ ] Connect App to Supabase.
- [ ] Create a `dreams` table (id, content, theme, image_url).
- [ ] functionality: "Save Dream" button actually saves to DB.

---

## 🧱 BRICK 3: The Identity (Auth)
**Goal:** Users need their own private journal.
- [ ] Create free Clerk account.
- [ ] Wrap app in `<ClerkProvider>`.
- [ ] Add "Sign In" / "Sign Up" buttons.
- [ ] Update Database: Only fetch dreams that belong to the logged-in user.

---

## 🧱 BRICK 4: The Gallery (UI)
**Goal:** Visually browse past dreams.
- [ ] Create `/journal` page.
- [ ] Build a "Grid of Cards" layout.
- [ ] Add "Delete" functionality.
- [ ] Polish: Empty states ("No dreams yet... sleep more").

---

## 🧱 BRICK 5: The Launch (Deployment)
**Goal:** Put it on the internet.
- [ ] Push code to GitHub.
- [ ] Connect to Vercel (Free).
- [ ] Add Environment Variables (Supabase keys, Clerk keys).
- [ ] **LIVE URL:** `dream-stream.vercel.app`

---

## 🚀 How we build this?
We focus on **ONE BRICK** at a time.
**Next Step:** Brick 2 (Supabase).
