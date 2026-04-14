# Complete Setup Instructions for Cursor AI

Follow these steps to get the project running in Cursor AI.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm installed
- Git (optional, for version control)

## Step 1: Install Dependencies

Open terminal in Cursor AI and run:

```bash
npm install
```

Or if you prefer pnpm:

```bash
pnpm install
```

## Step 2: Fix Image Imports (CRITICAL!)

⚠️ **The project will NOT run without fixing the image imports.**

### Quick Option: Use Placeholders

Follow the instructions in `/QUICK_FIX_IMAGES.md` to replace all `figma:asset` imports with Unsplash placeholder URLs.

This takes about 5 minutes and will get the project running immediately.

### Production Option: Export from Figma

1. Open your Figma file
2. Export all images used in the design
3. Create `/public/assets/` directory:
   ```bash
   mkdir -p public/assets
   ```
4. Copy exported images to `/public/assets/`
5. Update imports in:
   - `/src/app/components/Feed.tsx`
   - `/src/app/components/EduSync.tsx`
   - `/src/app/components/WhatIDo.tsx`
   - `/src/app/components/About.tsx`

Example replacement:
```typescript
// OLD (won't work in Cursor):
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";

// NEW (works everywhere):
const imgHero = "/assets/hero-image.png";
```

## Step 3: Verify Font Files

Check that fonts are properly loaded:

1. Open `/src/styles/fonts.css`
2. Verify font file paths
3. If fonts are missing, you may need to:
   - Download from Google Fonts (Inter, Cormorant)
   - Purchase Clash Grotesk Variable or use an alternative
   - Place font files in `/public/fonts/`

## Step 4: Start Development Server

```bash
npm run dev
```

Or with Vite directly:

```bash
npx vite
```

The app should now be running at `http://localhost:5173` (or similar port).

## Step 5: Check for Errors

Open browser console and check for:
- ❌ Module import errors → Fix remaining `figma:asset` imports
- ❌ Font loading errors → Check font file paths
- ❌ Component errors → Check for missing dependencies
- ✅ No errors → You're good to go!

## Known Issues & Solutions

### Issue 1: "Cannot find module 'figma:asset'"
**Solution:** You haven't fixed all the image imports yet. See Step 2.

### Issue 2: "Failed to resolve import 'motion/react'"
**Solution:** Run `npm install motion`

### Issue 3: Fonts not loading
**Solution:** 
1. Check `/src/styles/fonts.css`
2. Ensure font files exist in specified paths
3. Consider using CDN links for Google Fonts as fallback

### Issue 4: Build errors with Vite
**Solution:** The project uses Vite 6.3.5. Run:
```bash
npm install vite@6.3.5 --save-dev
```

## Package.json Summary

The project uses:
- **React 18.3.1** - UI framework
- **Vite 6.3.5** - Build tool
- **Tailwind CSS 4.1.12** - Styling
- **Motion 12.23.24** - Animations (formerly Framer Motion)
- **Radix UI** - Accessible component primitives
- **Material UI 7.3.5** - UI component library
- **Lucide React** - Icons
- **React Hook Form 7.55.0** - Form handling

All dependencies are already listed in `package.json` and will be installed with `npm install`.

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main app component
│   │   └── components/
│   │       ├── TopNav.tsx          # Navigation bar
│   │       ├── Sidebar.tsx         # Left sidebar
│   │       ├── Feed.tsx            # Right feed (requires image fixes)
│   │       ├── Hero.tsx            # Home page hero
│   │       ├── EduSync.tsx         # Case study page (requires image fixes)
│   │       ├── WhatIDo.tsx         # Services page (requires image fixes)
│   │       ├── Blogs.tsx           # Blog listing
│   │       ├── About.tsx           # About page (requires image fixes)
│   │       ├── Contact.tsx         # Contact form
│   │       ├── AskAnything.tsx     # Command bar
│   │       ├── CustomCursor.tsx    # Custom cursor
│   │       └── PageTransitionOverlay.tsx # Page transitions
│   ├── imports/                    # Figma imported components & SVGs
│   └── styles/
│       ├── fonts.css               # Font imports
│       ├── index.css               # Global styles
│       ├── tailwind.css            # Tailwind config
│       └── theme.css               # Theme variables
├── public/                         # Static assets (create this!)
│   └── assets/                     # Images (create this!)
├── package.json                    # Dependencies
├── vite.config.ts                  # Vite configuration
├── CURSOR_MIGRATION_GUIDE.md       # Detailed migration guide
├── QUICK_FIX_IMAGES.md             # Quick image fix instructions
└── SETUP_INSTRUCTIONS.md           # This file
```

## Build for Production

Once everything is working:

```bash
npm run build
```

This creates a `/dist` folder with production-ready files.

## Contact Form Setup (TODO)

The Contact form at `/src/app/components/Contact.tsx` needs backend integration to send emails to **heincise@gmail.com**.

Options:
1. **EmailJS** - Free tier available, easy setup
2. **Formspree** - Simple form endpoint
3. **Custom API** - Build with Node.js/Express
4. **Supabase** - Full backend solution

## Next Steps

1. ✅ Install dependencies
2. ✅ Fix image imports (use quick fix)
3. ✅ Start dev server
4. ✅ Test all pages
5. 🔲 Export real images from Figma (for production)
6. 🔲 Set up contact form backend
7. 🔲 Deploy to hosting (Vercel, Netlify, etc.)

## Getting Help

If you encounter issues:
1. Check the browser console for specific errors
2. Review `/CURSOR_MIGRATION_GUIDE.md` for detailed troubleshooting
3. Ensure all steps above were followed
4. Check that Node.js version is 18+

## Important Files to Review

- **CURSOR_MIGRATION_GUIDE.md** - Complete migration documentation
- **QUICK_FIX_IMAGES.md** - Fast image replacement guide
- **/src/app/App.tsx** - Main application logic
- **/src/styles/theme.css** - Design system tokens
- **/package.json** - All dependencies

---

**Ready to Start?** Run `npm install` then follow the Quick Fix guide to replace images!
