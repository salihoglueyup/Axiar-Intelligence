# Axiar Intelligence Platform — Implementation Plan

Full-stack monorepo: Frontend (Vite + React 18) + Backend (Supabase + Vercel Serverless) · Vercel Deploy

## Proposed Changes

### 1 · Project Scaffolding

#### [NEW] Vite + React Project (root)

```bash
npx -y create-vite@latest ./ -- --template react
```

**Bağımlılıklar (tek adımda):**

**Frontend (`client/`):**

| Paket | Amaç |
|---|---|
| `react-router-dom` | SPA routing |
| `tailwindcss @tailwindcss/vite` | Tailwind CSS v4 + Vite plugin |
| `framer-motion` | Animasyon / geçişler |
| `lucide-react` | Premium ikon seti |
| `react-toastify` | Bildirim toast'ları |
| `zustand` | Hafif state yönetimi |
| `axios` | API iletişimi |
| `zod` | Form validasyon |

**Backend (`api/`) + Shared:**

| Paket | Amaç |
|---|---|
| `@supabase/supabase-js` | Supabase client (Auth, DB, Storage, Realtime) |
| `zod` | Input validasyon |
| `@upstash/ratelimit` | Serverless rate limiting |
| `resend` | E-posta gönderimi |

---

### 2 · Proje Dizin Yapısı

> Detaylı dosya hiyerarşisi: [file_hierarchy.md](file:///C:/Users/eyupz/.gemini/antigravity/brain/dbb2fdfd-c738-4c74-8945-846ea09a6325/file_hierarchy.md)

---

### 3 · Tasarım Sistemi (Design Tokens)

#### [NEW] `tailwind.config.js` (veya `index.css` içinde Tailwind v4 CSS token'ları)

| Token | Değer | Kullanım |
|---|---|---|
| `--color-bg` | `#080B15` | Ana arka plan |
| `--color-bg-card` | `#0D1224` | Kart / panel arka planları |
| `--color-bg-glass` | `rgba(13,18,36,0.6)` | Glassmorphism yüzeyler |
| `--color-neon` | `#00F0FF` | Birincil vurgu (CTA, border glow) |
| `--color-neon-purple` | `#A855F7` | İkincil vurgu |
| `--color-text` | `#E2E8F0` | Metin (açık gri) |
| `--color-text-muted` | `#94A3B8` | İkincil metin |
| Font | `Inter` (Google Fonts) | Tüm tipografi |

> Neon glow efekti: `box-shadow: 0 0 20px rgba(0,240,255,0.3)` — hover durumlarında `0.5` opacity'e çıkar.

---

### 4 · Bileşen Detayları (Component Breakdown)

#### [NEW] `Navbar.jsx`
- `position: sticky`, glassmorphism (`backdrop-blur-xl`, yarı-saydam bg)
- Sol: Axiar logotype (SVG/text)
- Sağ: "Axiar Portal" butonu → `/portal/login` rotasına yönlendirir
- Mobilde hamburger menü (Framer Motion slide-in)

#### [NEW] `Hero.jsx`
- H1: **"Verinin Zekası, Sistemin Güvencesi"** — gradient text efekti
- Altında kısa açıklama + 2 CTA butonu ("Keşfet" · "İletişime Geç")
- Arka plan: Canvas tabanlı **particle / cyber-net** animasyonu (vanilla JS ile `<canvas>`)

#### [NEW] `Manifesto.jsx`
- YBS vizyonunu anlatan metin bloğu
- Sol tarafta dekoratif neon çizgi veya ikon, sağda metin
- Scroll-triggered reveal animasyonu (Framer Motion `whileInView`)

#### [NEW] `EcosystemGrid.jsx`
- 4 kart (AI, Security, Systems, Web)
- Her kart: ikon + başlık + açıklama
- Hover: neon border-glow + scale animasyonu

#### [NEW] `Showcase.jsx`
- CyberGuard AI & Metazon Capital OS tanıtım kartları
- Mockup görsel + kısa açıklama + "Demo" / "Detay" butonları

#### [NEW] `TechMarquee.jsx`
- Sonsuz yatay kayan teknoloji logoları (React, Vite, Tailwind, Python, Node.js vb.)
- CSS `@keyframes marquee` ile pure-CSS implementasyon

#### [NEW] `ContactForm.jsx`
- Ad, E-posta, Konu, Mesaj alanları
- `@emailjs/browser` ile backend'siz gönderim
- `react-toastify` ile başarı/hata bildirimi

#### [NEW] `PortalLayout.jsx`
- Route `/portal/*` altındaki tüm sayfaları sarar
- Sol: sabit dikey sidebar (Dashboard, Projeler, Raporlar, Faturalar, Ayarlar)
- Ana Navbar **gizlenir**, OS tarzı arayüz

#### [NEW] `Login.jsx`
- Tam ekran giriş formu (e-posta + şifre)
- Şimdilik mock auth (Zustand store'da `isAuthenticated` flag)

#### [NEW] `Dashboard.jsx`
- Özet stat kartları (aktif proje sayısı, bekleyen fatura vb.)
- Mini grafikler (placeholder — sonradan gerçek veri bağlanır)

---

### 5 · Routing Yapısı

```jsx
<Routes>
  {/* Landing — MainLayout */}
  <Route element={<MainLayout />}>
    <Route index element={<Home />} />
  </Route>

  {/* Portal — PortalLayout */}
  <Route path="portal">
    <Route path="login" element={<Login />} />
    <Route element={<PortalLayout />}>   {/* auth guard */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="projects"  element={<Projects />} />
      <Route path="reports"   element={<Reports />} />
      <Route path="invoices"  element={<Invoices />} />
      <Route path="settings"  element={<Settings />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
```

---

### 6 · Animasyon Stratejisi

| Trigger | Teknik | Detay |
|---|---|---|
| Sayfa açılış | Framer Motion `initial/animate` | Hero elemanları yukarıdan/aşağıdan fade-in |
| Scroll | `whileInView` + `viewport={{ once: true }}` | Kartlar, metin blokları sıralı reveal |
| Hover | `whileHover` | Kartlarda scale(1.03) + glow |
| Route geçişi | `AnimatePresence` + fade | Sayfalar arası yumuşak geçiş |
| Marquee | CSS keyframes | Sonsuz yatay kayma |

---

### 7 · Uygulama Sırası (Build Order)

1. **Scaffolding**: Monorepo init → `client/` Vite + `api/` + `supabase/` → bağımlılıklar → Tailwind + Vercel config
2. **Supabase setup**: Migration SQL'leri, RLS politikaları, Storage bucket'ları
3. **Design system**: `index.css` @theme token'ları, global stiller, font yükleme
4. **Backend edge**: `api/_lib/` (supabase-admin, middleware, mailer) → webhook, admin, cron endpoints
5. **App shell**: Router + MainLayout + PortalLayout + AuthContext (Supabase Auth) + AuthGuard
6. **Landing bileşenleri**: Navbar → Hero → Manifesto → EcosystemGrid → Showcase → TechMarquee → ContactForm → Footer
7. **Portal bileşenleri**: Login/Register → Sidebar → Dashboard → Projects → Reports → Invoices → Files → Settings
8. **Animasyonlar**: Tüm bileşenlere Framer Motion + hover efektleri
9. **SEO & Final**: Meta tags, OG, Lighthouse audit, responsive QA, Vercel deploy

---

## User Review Required

> [!IMPORTANT]
> **Tailwind CSS v4** — CSS-first konfigürasyon (`@theme` direktifleri `index.css` içinde).

> [!IMPORTANT]
> **Supabase gerekli**: Bir Supabase projesi oluşturulmalı. URL + Anon Key + Service Role Key gerekecek.

> [!NOTE]
> **Auth**: Supabase Auth kullanılacak (e-posta/şifre + opsiyonel OAuth). Özel JWT yönetimi gereksiz.

> [!NOTE]
> **E-posta**: İletişim formu `api/contact.js` serverless function üzerinden Resend ile gönderilecek.

---

## Verification Plan

### Browser Test (Dev Server)
1. `npm run dev` ile dev server başlatılır
2. Browser subagent ile landing page'in tüm bölümleri (Hero → Contact) taranır
3. Portal login → Dashboard navigasyonu test edilir
4. Responsive kontrol: viewport 375px (mobil), 768px (tablet), 1440px (desktop)

### Build Doğrulama
```bash
npm run build
```
- Hatasız build tamamlanmalı
- `dist/` klasöründe çıktı oluşmalı

### Manuel Doğrulama (kullanıcı tarafından)
- Tüm sayfaları gezip görsel kaliteyi onaylama
- Animasyonların akıcılığını kontrol etme
- Mobil cihazdan gerçek test
