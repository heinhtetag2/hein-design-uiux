# Project Structure & File Guide

Complete visual guide to understanding where everything is in this project.

## 📁 Root Directory

```
portfolio-website/
│
├── 📄 START_HERE.md                    ⭐ Begin your migration here
├── 📄 README.md                        📖 Project overview
├── 📄 QUICK_FIX_IMAGES.md             🔥 Fix images FIRST (required!)
├── 📄 SETUP_INSTRUCTIONS.md            🛠️ Detailed setup guide
├── 📄 CURSOR_MIGRATION_GUIDE.md        🚨 Troubleshooting & fixes
├── 📄 CONTACT_FORM_SETUP.md            📧 Email integration options
├── 📄 MIGRATION_CHECKLIST.md           ✅ Step-by-step tasks
├── 📄 PROJECT_STRUCTURE.md             📂 This file
├── 📄 .cursorrules                     🤖 Cursor AI project rules
│
├── 📄 package.json                     📦 Dependencies & scripts
├── 📄 vite.config.ts                   ⚙️ Vite configuration
├── 📄 postcss.config.mjs               🎨 PostCSS config
├── 📄 tsconfig.json                    📘 TypeScript config
│
├── 📂 src/                             💻 Source code
├── 📂 public/                          🌐 Static assets (create this!)
├── 📂 node_modules/                    📦 Installed packages
└── 📂 dist/                            🏗️ Build output (after npm run build)
```

---

## 📂 Source Directory (`/src`)

```
src/
│
├── 📂 app/                             🎯 Main application
│   ├── 📄 App.tsx                      🏠 Root component & routing
│   │
│   └── 📂 components/                  🧩 All components
│       │
│       ├── 🎨 PAGE COMPONENTS
│       ├── 📄 Hero.tsx                 Home page hero section
│       ├── 📄 EduSync.tsx              Case study page ⚠️ Needs images
│       ├── 📄 WhatIDo.tsx              Services page ⚠️ Needs images
│       ├── 📄 Blogs.tsx                Blog listing page
│       ├── 📄 About.tsx                About page ⚠️ Needs images
│       ├── 📄 Contact.tsx              Contact form ⚠️ Needs email setup
│       │
│       ├── 🎯 NAVIGATION COMPONENTS
│       ├── 📄 TopNav.tsx               Top navigation bar
│       ├── 📄 Sidebar.tsx              Left sidebar with case studies
│       ├── 📄 Feed.tsx                 Right feed cards ⚠️ Needs images
│       │
│       ├── 🌟 FEATURE COMPONENTS
│       ├── 📄 AskAnything.tsx          Command bar (Cmd+K)
│       ├── 📄 CustomCursor.tsx         Custom cursor
│       ├── 📄 PageTransitionOverlay.tsx Page transitions
│       │
│       ├── 📂 figma/                   🔒 Protected Figma utilities
│       │   └── 📄 ImageWithFallback.tsx Image component (DON'T EDIT)
│       │
│       └── 📂 ui/                      🧱 UI component library
│           ├── 📄 accordion.tsx
│           ├── 📄 alert-dialog.tsx
│           ├── 📄 alert.tsx
│           ├── 📄 avatar.tsx
│           ├── 📄 badge.tsx
│           ├── 📄 button.tsx
│           ├── 📄 calendar.tsx
│           ├── 📄 card.tsx
│           ├── 📄 checkbox.tsx
│           ├── 📄 dialog.tsx
│           ├── 📄 dropdown-menu.tsx
│           ├── 📄 form.tsx
│           ├── 📄 input.tsx
│           ├── 📄 label.tsx
│           ├── 📄 select.tsx
│           ├── 📄 separator.tsx
│           ├── 📄 switch.tsx
│           ├── 📄 tabs.tsx
│           ├── 📄 textarea.tsx
│           ├── 📄 tooltip.tsx
│           └── ... (50+ more UI components)
│
├── 📂 imports/                         🎨 Figma imported assets
│   ├── 📄 Desktop.tsx                  Figma component imports
│   ├── 📄 Desktop15.tsx
│   ├── 📄 Frame114.tsx
│   ├── 📄 WhatIDo.tsx
│   ├── 📄 About.tsx
│   └── 📄 svg-*.ts/tsx                 70+ SVG files (working!)
│
└── 📂 styles/                          🎨 Global styles
    ├── 📄 fonts.css                    🔤 Custom font imports
    ├── 📄 index.css                    🌐 Global CSS
    ├── 📄 tailwind.css                 🎨 Tailwind v4 config
    └── 📄 theme.css                    🎨 Design system tokens
```

---

## 📂 Public Directory (CREATE THIS!)

```
public/                                 🌐 Static assets
│
└── 📂 assets/                          🖼️ Images folder (create this!)
    ├── 📷 hero-image.png               Example: hero images
    ├── 📷 project-1.png                Example: project images
    ├── 📷 team-member-1.jpg            Example: team photos
    └── ... (add your exported images here)
```

**⚠️ Important:** This folder doesn't exist yet. Create it when you export images from Figma.

---

## 🎯 Key Files Explained

### Configuration Files

| File | Purpose | Touch? |
|------|---------|--------|
| `package.json` | Dependencies & scripts | ❌ Don't edit manually |
| `vite.config.ts` | Vite build configuration | ⚠️ Only if needed |
| `tsconfig.json` | TypeScript configuration | ⚠️ Only if needed |
| `.cursorrules` | Cursor AI project rules | ✅ For context only |

### Documentation Files

| File | When to Read | Priority |
|------|--------------|----------|
| `START_HERE.md` | First! | 🔥🔥🔥 |
| `QUICK_FIX_IMAGES.md` | Before running | 🔥🔥🔥 |
| `README.md` | After quick fix | 🔥🔥 |
| `SETUP_INSTRUCTIONS.md` | Detailed setup | 🔥 |
| `CONTACT_FORM_SETUP.md` | When ready for email | 🔥 |
| `CURSOR_MIGRATION_GUIDE.md` | When you have errors | 🔥 |
| `MIGRATION_CHECKLIST.md` | Throughout migration | ✅ |
| `PROJECT_STRUCTURE.md` | Understanding layout | 📂 |

### Application Files

| File | Purpose | Edit? |
|------|---------|-------|
| `/src/app/App.tsx` | Main app & routing | ✅ Yes |
| `/src/app/components/Hero.tsx` | Home page | ✅ Yes |
| `/src/app/components/EduSync.tsx` | Case study | ⚠️ Fix images first |
| `/src/app/components/WhatIDo.tsx` | Services | ⚠️ Fix images first |
| `/src/app/components/Blogs.tsx` | Blog page | ✅ Yes |
| `/src/app/components/About.tsx` | About page | ⚠️ Fix images first |
| `/src/app/components/Contact.tsx` | Contact form | ⚠️ Setup email first |
| `/src/app/components/TopNav.tsx` | Top navigation | ✅ Yes |
| `/src/app/components/Sidebar.tsx` | Left sidebar | ✅ Yes |
| `/src/app/components/Feed.tsx` | Right feed | ⚠️ Fix images first |

### Style Files

| File | Purpose | Edit? |
|------|---------|-------|
| `/src/styles/fonts.css` | Font imports | ⚠️ If fonts missing |
| `/src/styles/index.css` | Global styles | ⚠️ Rarely |
| `/src/styles/tailwind.css` | Tailwind config | ❌ Don't touch |
| `/src/styles/theme.css` | Design tokens | ⚠️ For customization |

---

## 🚨 Files That Need Fixing

### Critical (Won't run without fixing)

| File | Issue | Lines | Guide |
|------|-------|-------|-------|
| `Feed.tsx` | 5 image imports | 2-6 | QUICK_FIX_IMAGES.md |
| `EduSync.tsx` | 21 image imports | 4-24 | QUICK_FIX_IMAGES.md |
| `WhatIDo.tsx` | 7 image imports | 4-10 | QUICK_FIX_IMAGES.md |
| `About.tsx` | 9 image imports | 7-15 | QUICK_FIX_IMAGES.md |

**Total:** 42+ images to replace

### Optional (For production)

| File | Issue | Guide |
|------|-------|-------|
| `Contact.tsx` | No email backend | CONTACT_FORM_SETUP.md |
| `fonts.css` | May need font files | Check paths |

---

## 🎨 Design System Files

### Theme Variables (`/src/styles/theme.css`)
```css
:root {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --muted: #2d2d2d;
  --muted-foreground: #9b9b9b;
  /* ... more variables */
}
```

### Font Declarations (`/src/styles/fonts.css`)
```css
@font-face {
  font-family: 'Cormorant';
  src: url(...);
}
@font-face {
  font-family: 'Inter';
  src: url(...);
}
@font-face {
  font-family: 'Clash Grotesk Variable';
  src: url(...);
}
```

---

## 📦 Dependencies Overview

### Core (Always needed)
- `react` (18.3.1) - UI framework
- `react-dom` (18.3.1) - React DOM
- `typescript` - Type safety
- `vite` (6.3.5) - Build tool

### Styling
- `tailwindcss` (4.1.12) - CSS framework
- `@tailwindcss/vite` - Tailwind plugin

### Animation
- `motion` (12.23.24) - Animations library

### UI Components
- `@radix-ui/*` - Accessible components
- `@mui/material` (7.3.5) - Material UI
- `lucide-react` - Icons

### Forms
- `react-hook-form` (7.55.0) - Form handling

### Utilities
- `class-variance-authority` - CSS utilities
- `clsx` - Class name helper
- `tailwind-merge` - Merge Tailwind classes

---

## 🔍 Finding Things

### Looking for...

**Navigation code?**
→ `/src/app/components/TopNav.tsx`
→ `/src/app/components/Sidebar.tsx`

**Home page content?**
→ `/src/app/components/Hero.tsx`
→ `/src/app/components/Feed.tsx`

**Case study page?**
→ `/src/app/components/EduSync.tsx`

**Contact form?**
→ `/src/app/components/Contact.tsx`

**Animations?**
→ Search for `motion.` in any component
→ Check `PageTransitionOverlay.tsx`

**Styles?**
→ `/src/styles/theme.css` (design tokens)
→ Inline Tailwind classes in components

**Images?**
→ ⚠️ Need to create `/public/assets/`
→ Currently using `figma:asset` (broken)

**Fonts?**
→ `/src/styles/fonts.css`

**Icons?**
→ From `lucide-react` package
→ Import like: `import { Icon } from "lucide-react"`

---

## 🛠️ Common Tasks

### Add a new page
1. Create component in `/src/app/components/NewPage.tsx`
2. Add to view type in `/src/app/App.tsx`
3. Add navigation in `Sidebar.tsx` or `TopNav.tsx`

### Change colors
1. Edit `/src/styles/theme.css`
2. Update CSS variables

### Fix fonts
1. Check `/src/styles/fonts.css`
2. Verify font file paths
3. Add fallback fonts if needed

### Replace images
1. Export from Figma
2. Save to `/public/assets/`
3. Update imports in component files

### Deploy
1. Run `npm run build`
2. Upload `/dist` folder to hosting
3. Or use Vercel/Netlify CLI

---

## 📝 Quick Reference

**Most edited files:**
- `/src/app/App.tsx` - Routing & main app
- `/src/app/components/[Page].tsx` - Page content
- `/src/styles/theme.css` - Design customization

**Rarely touch:**
- `/src/app/components/ui/*` - UI library
- `/src/app/components/figma/*` - Protected
- `vite.config.ts` - Build config
- `package.json` - Dependencies

**Create yourself:**
- `/public/` - Static files folder
- `/public/assets/` - Image folder

---

## 🎯 Migration Path

```
1. Start → START_HERE.md
2. Fix → QUICK_FIX_IMAGES.md (5 min)
3. Install → npm install (2 min)
4. Run → npm run dev (1 min)
5. Test → Browser localhost:5173
6. Customize → Update content
7. Email → CONTACT_FORM_SETUP.md
8. Deploy → npm run build
```

---

**Need help navigating?** Open the relevant documentation file from the root directory.

**Lost?** Start with `START_HERE.md` → `README.md` → specific guides.
