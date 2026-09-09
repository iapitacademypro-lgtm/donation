# Website Slow Load Kyun Ho Rahi Hai — Analysis

> Focus: **home page (`src/app/page.tsx`)** aur **support page (`src/app/support/page.tsx`)**
> Date: 2026-09-09

---

## TL;DR (ek line me)

Bohot **heavy images** (PNG me photos, 1–7 MB each) + support page `next/image`
use nahi kar raha + poora app client-side render ho raha hai (framer-motion +
Clerk) = pehle blank white screen, phir slow load.

---

## 1. Images bohot heavy hain (SABSE BADI wajah)

`public/` folder me photos **PNG** format me save hain. PNG photos ke liye
JPG/WebP se **5–10x bada** hota hai.

| File | Size | Kahan use hoti hai |
|---|---|---|
| `top2.png` | **7.3 MB** | donate-monthly hero |
| `Maize.png` | **4.1 MB** | support card + donate/[type] page |
| `phillpine_distibuti_meal.png` | 2.4 MB | support |
| `sadaq1.png` | **2.1 MB** | **HOME page** — NewsletterSection |
| `foodimg.png` | 2.0 MB | (unused?) |
| `qurbani20263.png` | 1.8 MB | support / donate |
| `qurbani20262.png` | 1.8 MB | support "Qurbani" card |
| `sadqa3.png` | 1.7 MB | support "SADAQAH / LILLAH" card |
| `african.png` | 1.1 MB | (unused?) |
| `phillipne_emergency_flood_relef.jpg` | 897 KB | support |
| `hero.png` | 851 KB | **HOME page** — HeroSection |
| `phillipne_mouque.jpg` | 667 KB | support |
| `web3/img1.jpg` … `img5.jpg` | ~640–840 KB each = **~3.8 MB total** | support "Jamia" carousel |
| `qurbani26/qurbani22.png` | 2.1 MB | support carousel |
| `qurbani26/Qurbani23.png` | 1.8 MB | support carousel |

**Support page ek baar me aaram se 15–25 MB download karwa raha hai.**

### Fix
- Saari photo PNG ko **WebP ya JPG** me convert karo, har ek **< 200 KB**.
  - `top2.png` 7.3 MB → ~150 KB WebP (≈ 98% kam).
- Tool: squoosh.app, `sharp`, ya `npx @squoosh/cli`.
- Images ki real display size ~600px width hai — 3000px+ source rakhne ki zaroorat nahi.

---

## 2. Support page `next/image` use NAHI kar raha

**File:** `src/app/support/page.tsx` (lines ~159–175)

```jsx
{card.images ? (
  <img
    src={card.images[jamiaIndex % card.images.length]}
    alt={card.alt}
    loading={index < 3 ? "eager" : "lazy"}
    className="absolute inset-0 w-full h-full object-fill"
  />
) : (
  <img
    src={card.image || "/placeholder.svg"}
    alt={card.alt}
    loading={index < 3 ? "eager" : "lazy"}
    className="absolute inset-0 w-full h-full object-fill"
  />
)}
```

Plain `<img>` tag hai, `next/image` nahi. Iska matlab:

- 4 MB wali `Maize.png` chhote se card ke liye **poori resolution** me download hoti hai
- Koi automatic **WebP conversion** nahi
- Koi automatic **resize** nahi (Next `<Image>` device ke hisaab se resize karta)
- Proper lazy-load / blur placeholder nahi
- Jamia carousel `setInterval` (har 3.5s) se **saari 7 images** fetch kar leta hai;
  pehle 3 card `loading="eager"` → turant download

### Fix
`<img>` ki jagah `next/image` ka `<Image fill sizes="(max-width:640px) 90vw, 30vw" />`
lagao. Isse Next khud resize + WebP serve karega — PNG recompress karne se **pehle bhi**
bada farq padega.

---

## 3. Home page (`src/app/page.tsx`) issues

`page.tsx` khud simple hai:

```jsx
<Navbar/>
<HeroSection/>
<AfricaAidSection/>
<BannerPage/>
<NewsletterSection/>
```

Problems child components me hain:

### 3a. `HeroSection.tsx`
- `/images12.png` (182 KB) + `/hero.png` (**851 KB**) — dono par `priority`
- `min-h-screen` full-screen section

### 3b. `Banner.tsx`
- Desktop image `/banner.jpeg` (221 KB) **aur** mobile `/banner1.jpg` (87 KB) —
  **dono `<Image>` render hote hain**, sirf CSS se `hidden`
- Matlab mobile user desktop wali 221 KB bhi download karta hai
- Dono par `priority` laga hai, jabki ye section **screen se neeche** hai (below the fold)

### 3c. `NewsletterSection.tsx`
- `/sadaq1.png` = **2.1 MB** load karta hai
- Ye bhi below the fold hai, phir bhi bhaari

### 3d. Sab kuch client-side + framer-motion
- Har component `"use client"` + `framer-motion`
- Har `motion.div` par `initial={{ opacity: 0 }}` — matlab JS bundle download +
  hydrate hone tak page **khaali safed** dikhta hai, phir fade-in hota hai
- Slow network par = lamba blank white screen

### Fix
- `Banner` aur `NewsletterSection` se `priority` **hata do** (sirf hero LCP image par rakho)
- `Banner` ke 2 `<Image>` ko 1 karo, ya proper `sizes` do
- `NewsletterSection` ki `sadaq1.png` optimize karo + `loading="lazy"`
- Above-the-fold hero text par `initial={{opacity:0}}` mat lagao — pehla paint me text turant dikhe

---

## 4. Poora app client-rendered hai

**File:** `src/app/layout.tsx` → `LayoutClientWrapper.tsx`

```jsx
"use client";
export default function LayoutClientWrapper({ children }) {
  return (
    <ClerkProvider>
      <header> ... <Navbar /> </header>
      {children}
      <Footer />
      <Toaster ... />
    </ClerkProvider>
  );
}
```

- `"use client"` wrapper poore app ko wrap karta hai → koi page server-render ka
  fayda nahi le pata is wrapper ke neeche
- `<ClerkProvider>` har page par Clerk ka JS load karta hai — un pages par bhi
  jinme auth chahiye hi nahi (support, faqs, policy…)
- Clerk **keyless mode** me hai (`src/README.md` dekho) → har request par Clerk
  apne server se baat karta hai instance claim karne ke liye = extra latency

### Fix
- `LayoutClientWrapper` ko chhota karo — sirf `<ClerkProvider>` + auth buttons
  client rahe; `Navbar`/`Footer` already alag components hain
- Proper Clerk keys `.env` me add karo (keyless mode production ke liye nahi hai)

---

## 5. Chhoti cheezein

| Issue | File | Impact |
|---|---|---|
| Double `<Navbar/>` render hota hai | `layout` wrapper + `page.tsx` dono | 2x scroll listener, 2x Clerk `useUser` |
| GTM script `dangerouslySetInnerHTML` se `<head>` me | `src/app/layout.tsx` | `next/script` `strategy="afterInteractive"` use karo |
| `object-fill` images ko distort karta hai | `support/page.tsx` | `object-cover` behtar dikhega (speed par asar nahi) |
| `next.config.ts` me `images.formats` set nahi | root | default me AVIF/WebP hota hai — par sirf `next/image` ke liye |

---

## Priority order (sabse zyada fayda pehle)

1. **Saari photo PNG → WebP/JPG compress** (< 200 KB each) — ~90% weight kam
2. **Support page `<img>` → `next/image`** (`fill` + `sizes`)
3. **Home page: `Banner` + `NewsletterSection` se `priority` hatao**, hero par rakho
4. **`NewsletterSection` `sadaq1.png` optimize**
5. Support page ko server component banao, sirf carousel alag client component
6. GTM `next/script` par shift karo
7. Proper Clerk keys add karo (keyless mode hatao)

---

## Expected result

- Support page: **~20 MB → ~1.5 MB** (10x+ faster)
- Home page: first paint pe text turant, images progressive
- LCP (Largest Contentful Paint): kaafi neeche aayega
