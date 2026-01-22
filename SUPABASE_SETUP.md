# 🗄️ Brick 2: Supabase Setup Guide

**We need a place to store your dreams.**
Follow these steps to set up your free database.

---

## 1. Create Project
1.  Go to [database.new](https://database.new) (Supabase).
2.  Sign in with GitHub.
3.  Click **"New Project"**.
4.  Name: `DreamStream`.
5.  Password: (Generate a strong one).
6.  Region: Choose closest to you.
7.  Click **"Create New Project"**.

---

## 2. Get API Keys
1.  Once project is created (takes ~2 mins), go to **Project Settings** (Cog icon) -> **API**.
2.  Find **Project URL**. Copy it.
3.  Find **anon public** key. Copy it.
4.  Create a file named `.env.local` in `apps/dream-stream/`.
5.  Paste them like this:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 3. Create Database Table (SQL)
1.  Go to **SQL Editor** (Icon looks like `>_` on left sidebar).
2.  Click **"New Query"**.
3.  Paste this **EXACT** code (it handles everything):

```sql
-- Create the table
create table dreams (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  theme text,
  mood text,
  image_url text,
  user_id text -- Will use this later for Auth
);

-- Enable Security (Row Level Security)
alter table dreams enable row level security;

-- POLICY: Allow anyone to read/write (FOR NOW - Phase 1 only)
-- We will lock this down in Brick 3 (Auth)
create policy "Public Access" on dreams
for all
using (true)
with check (true);
```

4.  Click **"Run"** (Bottom right).
5.  You should see "Success".

---

## ✅ You are done!
Once you do this, tell me "Keys Added" and "Table Created".
I will implement the **"Save Button"** functionality.
