# Troubleshooting FAQ

Quick solutions to common issues when migrating this project to Cursor AI.

## 🔥 Critical Errors

### ❌ "Cannot find module 'figma:asset/...'"

**Error message:**
```
Cannot find module 'figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png'
```

**Cause:** Figma-specific imports don't work in Cursor AI.

**Solution:**
1. Open `QUICK_FIX_IMAGES.md`
2. Replace all `figma:asset` imports with Unsplash URLs or local paths
3. This affects 42+ images in 4 files:
   - `Feed.tsx` (5 images)
   - `EduSync.tsx` (21 images)
   - `WhatIDo.tsx` (7 images)
   - `About.tsx` (9 images)

**Quick fix example:**
```typescript
// Before (broken):
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";

// After (works):
const imgHero = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&h=840&fit=crop";
```

---

### ❌ "Failed to resolve import 'motion/react'"

**Error message:**
```
Failed to resolve import "motion/react" from "src/app/App.tsx"
```

**Cause:** Motion package not installed.

**Solution:**
```bash
npm install motion
```

Then restart dev server:
```bash
npm run dev
```

---

### ❌ "Module not found: Can't resolve '@/...'

**Error message:**
```
Module not found: Can't resolve '@/components/...'
```

**Cause:** Path alias not configured properly.

**Solution:** Already configured in `vite.config.ts`. If issue persists:
1. Check `vite.config.ts` has:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```
2. Restart dev server
3. If still broken, use relative imports instead:
```typescript
// Instead of:
import { Button } from '@/components/ui/button';

// Use:
import { Button } from './components/ui/button';
```

---

## 💻 Installation Issues

### ❌ "npm install" fails

**Cause:** Node version incompatibility or network issues.

**Solution 1 - Check Node version:**
```bash
node --version
```
Need Node 18 or higher. If lower:
- Download from https://nodejs.org
- Install latest LTS version
- Run `npm install` again

**Solution 2 - Clear cache:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 3 - Use pnpm instead:**
```bash
npm install -g pnpm
pnpm install
```

---

### ❌ "EACCES: permission denied"

**Cause:** Permission issues with npm.

**Solution (Mac/Linux):**
```bash
sudo npm install
```

**Solution (Better - fix npm permissions):**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add to .bashrc or .zshrc:
export PATH=~/.npm-global/bin:$PATH
```

---

## 🖼️ Image Issues

### ❌ Images not showing / 404 errors

**Cause 1:** Still using `figma:asset` imports.
**Solution:** Fix all image imports (see QUICK_FIX_IMAGES.md)

**Cause 2:** Image path incorrect.
**Solution:** 
- Check browser console for exact 404 path
- Verify image exists at that location
- Use correct path format:
  ```typescript
  // Public folder:
  const img = "/assets/image.png"
  
  // Unsplash:
  const img = "https://images.unsplash.com/photo-..."
  ```

**Cause 3:** Images not in public folder.
**Solution:**
1. Create `/public/assets/` folder
2. Add your images there
3. Reference as `/assets/image-name.png`

---

### ❌ ImageWithFallback not working

**Error:**
```
Cannot find module './figma/ImageWithFallback'
```

**Solution:** Fix import path based on file location:
```typescript
// From /src/app/App.tsx:
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// From /src/app/components/Hero.tsx:
import { ImageWithFallback } from './figma/ImageWithFallback';

// From /src/app/components/subfolder/Component.tsx:
import { ImageWithFallback } from '../figma/ImageWithFallback';
```

---

## 🎨 Style Issues

### ❌ Tailwind classes not working

**Symptoms:** 
- Classes not applying
- No styling visible
- Console shows warnings

**Solution 1 - Verify Tailwind plugin:**
Check `vite.config.ts` has:
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← Must be here
  ],
})
```

**Solution 2 - Check imports:**
Verify `/src/styles/index.css` imports Tailwind:
```css
@import "tailwindcss";
```

**Solution 3 - Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### ❌ Fonts not loading / wrong font

**Symptoms:**
- Text looks like system font
- Font warnings in console

**Solution 1 - Check font files:**
```bash
# Open fonts.css
cat src/styles/fonts.css
```
Verify paths to font files are correct.

**Solution 2 - Use Google Fonts CDN:**
Add to `/src/styles/fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;600&family=Inter:wght@300;400;500;600&display=swap');
```

**Solution 3 - Check font-family usage:**
```typescript
// Correct:
className="font-['Cormorant',serif]"
className="font-['Inter',sans-serif]"

// Incorrect:
className="font-cormorant" // Won't work
```

---

## 🚀 Dev Server Issues

### ❌ Port already in use

**Error:**
```
Port 5173 is already in use
```

**Solution 1 - Kill process:**
```bash
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

**Solution 2 - Use different port:**
```bash
npm run dev -- --port 3000
```

---

### ❌ "VITE_CJS_TRACE" warning

**Warning in console:**
```
The CJS build of Vite's Node API is deprecated
```

**Solution:** This is just a warning, safe to ignore. Or update to ESM:
```javascript
// In vite.config.ts, ensure you're using:
import { defineConfig } from 'vite'
// Not require()
```

---

## 🔧 Build Issues

### ❌ Build fails / TypeScript errors

**Error:**
```
Type error: ...
```

**Solution 1 - Fix type errors:**
Read the error message carefully and fix the specific type issue.

**Solution 2 - Skip type checking (temporary):**
```bash
npm run build -- --mode production --no-type-check
```

**Solution 3 - Check tsconfig:**
Verify `tsconfig.json` exists and is valid.

---

### ❌ "Out of memory" during build

**Error:**
```
JavaScript heap out of memory
```

**Solution:**
```bash
# Increase memory limit:
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## 📱 Browser Issues

### ❌ Blank page / white screen

**Cause:** JavaScript error preventing render.

**Solution:**
1. Open browser console (F12)
2. Check for red error messages
3. Fix the error (usually import or syntax issue)
4. Refresh page

**Common causes:**
- Missing import
- Syntax error
- Component crash
- Image import error

---

### ❌ Page not found (404)

**Cause:** Routing issue.

**Solution:** 
This app uses view-based routing, not URL routing. Check `/src/app/App.tsx`:
```typescript
const [currentView, setCurrentView] = useState<"home" | "edusync" | ...>("home");
```

To navigate, use the navigation components (TopNav, Sidebar).

---

### ❌ Animations not working

**Symptoms:**
- Elements appear without animation
- Choppy animation
- No motion effects

**Solution 1 - Check Motion import:**
```typescript
import { motion } from "motion/react"; // Correct
import { motion } from "framer-motion"; // Wrong
```

**Solution 2 - Verify element usage:**
```typescript
// Correct:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// Wrong:
<div
  initial={{ opacity: 0 }} // Won't work on regular div
>
```

**Solution 3 - Check viewport prop:**
```typescript
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }} // ← Important
>
```

---

## 📧 Contact Form Issues

### ❌ Form doesn't send emails

**Cause:** No backend configured yet.

**Solution:** See `CONTACT_FORM_SETUP.md` for three options:
1. EmailJS (recommended)
2. Formspree (easiest)
3. Custom backend (advanced)

---

### ❌ Form validation not working

**Cause:** React Hook Form not set up properly.

**Solution:** Update Contact.tsx with proper form handling:
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("name", { required: true })} />
</form>
```

---

## 🌐 Deployment Issues

### ❌ Deployed site is blank

**Cause:** Build output not configured correctly.

**Solution (Vercel/Netlify):**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

---

### ❌ Images missing in production

**Cause:** Images not included in build.

**Solution:**
1. Ensure images are in `/public` folder
2. Reference with absolute paths: `/assets/image.png`
3. Don't use relative imports for public images

---

## 🔍 Debug Checklist

When something breaks, check:

1. **Console errors** (browser F12)
   - Look for red error messages
   - Note file and line number

2. **Network tab** (browser F12)
   - Check for 404s (missing files)
   - Verify asset loading

3. **Package installation**
   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Restart dev server**
   ```bash
   # Stop (Ctrl+C)
   npm run dev
   ```

5. **Check guides**
   - QUICK_FIX_IMAGES.md
   - CURSOR_MIGRATION_GUIDE.md
   - SETUP_INSTRUCTIONS.md

6. **Verify Node version**
   ```bash
   node --version # Need 18+
   ```

---

## 💡 Pro Tips

### Debugging Images
```typescript
// Add console.log to check import:
console.log('Image path:', imgHero);

// Or display raw path:
<div>{imgHero}</div>
```

### Debugging Styles
```typescript
// Check if class applies:
<div className="bg-red-500"> // Should be red
```

### Debugging Motion
```typescript
// Simplify animation:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  // Remove other props to isolate issue
>
```

### Debugging Build
```bash
# Try production preview locally:
npm run build
npx vite preview
# Visit localhost:4173
```

---

## 📞 Still Stuck?

1. **Check all documentation:**
   - START_HERE.md
   - README.md
   - CURSOR_MIGRATION_GUIDE.md
   - SETUP_INSTRUCTIONS.md

2. **Verify setup steps:**
   - npm install completed?
   - Images fixed?
   - Dev server running?

3. **Check system requirements:**
   - Node.js 18+ installed?
   - npm 8+ installed?
   - Enough disk space?

4. **Try clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

5. **Start fresh:**
   - Re-download project
   - Follow START_HERE.md from beginning
   - Don't skip steps

---

## 🎯 Quick Solutions Reference

| Error | Quick Fix |
|-------|-----------|
| figma:asset error | QUICK_FIX_IMAGES.md |
| motion/react error | `npm install motion` |
| Port in use | Change port or kill process |
| Missing module | `npm install` |
| Blank page | Check console for errors |
| Fonts wrong | Check fonts.css paths |
| Images 404 | Verify image paths |
| TypeScript error | Read error, fix type |
| Build fails | Check console output |

---

**Remember:** 90% of issues are fixed by:
1. Fixing image imports (QUICK_FIX_IMAGES.md)
2. Running `npm install`
3. Restarting dev server

**The rest:** Check this FAQ or detailed guides!
