# Cursor AI Migration Guide

This document contains critical information for migrating this project from Figma Make to Cursor AI.

## ⚠️ CRITICAL: Image Import Issues

### The Problem
This project uses **Figma-specific `figma:asset` imports** that will NOT work in Cursor AI. These virtual module imports need to be converted to regular file paths.

### Affected Files
The following components use `figma:asset` imports:
- `/src/app/components/Feed.tsx` - 5 images
- `/src/app/components/EduSync.tsx` - 21 images
- `/src/app/components/WhatIDo.tsx` - 7 images
- `/src/app/components/About.tsx` - 9 images
- `/src/imports/Desktop.tsx` - 6 images
- `/src/imports/Desktop15.tsx` - Multiple images

### Solution Options

#### Option 1: Use Placeholder Images (Quick Fix)
Replace all `figma:asset` imports with Unsplash placeholders:

```typescript
// Before:
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";

// After:
const imgHero = "https://images.unsplash.com/photo-[relevant-photo-id]?w=1800&h=840&fit=crop";
```

#### Option 2: Create Local Assets (Recommended)
1. Create an `/public/assets` directory
2. Export all images from Figma
3. Place them in `/public/assets/`
4. Update imports to use relative paths:

```typescript
// Before:
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";

// After:
const imgHero = "/assets/hero-image.png";
// Or use import:
import imgHero from "../../../public/assets/hero-image.png";
```

## Complete List of Images to Replace

### Feed.tsx (5 images)
```typescript
import imgB649 from "figma:asset/35886ff6561815df7917d466940de002809a4a3d.png";
import imgP0B7 from "figma:asset/1b19b9b3e1077a0d4a4c4f74d6f89f35ef41eb23.png";
import imgP4Ac from "figma:asset/1ed4c32e51a429bb934fb537ab0471678bd6b69e.png";
import imgP2B9 from "figma:asset/1e1108f1f3f3d56bbd42fc890f551b1c0a981af9.png";
import imgA4A8 from "figma:asset/2aea51d5f4e2f60ebbde776dd7856e2979c72149.png";
```

### EduSync.tsx (21 images)
```typescript
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";
import imgVideo from "figma:asset/c0e27df19987b0111c135648261e2b7a0073d7b6.png";
import imgFrame78 from "figma:asset/c619eef3495a0460eeae6e92bd0102cc5ef1c00b.png";
import imgFrame79 from "figma:asset/cab647aa049a4e042e08a8d72bab02d6b13ab877.png";
import imgFrame80 from "figma:asset/20eb2b438a61a9cd9dabc51b1c5cbac35ce60576.png";
import imgApp1 from "figma:asset/d7e9594efbc1437a46cb4ab6ebd5249ccaa232df.png";
import imgApp2 from "figma:asset/70ea0115732653ee767011fc986beb0c346e312a.png";
import imgApp3 from "figma:asset/7d8e089fa8ab9cf6b7be979ec235d6faf97770ca.png";
import imgImage1 from "figma:asset/dc6b2be9a3fe15e13443037163a086f6c25ed151.png";
import imgFrame81 from "figma:asset/2adfbf209eadb16469e199fbca27f8b4691a513f.png";
import imgFrame82 from "figma:asset/b1ae1dc4e5ce02ea12b387406cc8b83e659cadc5.png";
import imgFrame83 from "figma:asset/b512a8e59c334e920f829e74c1ee398898fd445c.png";
import imgImage2 from "figma:asset/f0ec07ca565c1a95fda88e2cb24343fa120c072c.png";
import imgImage3 from "figma:asset/5eb982b5824319bd5a74858110b312dc486a0a1e.png";
import imgImage4 from "figma:asset/cc9e89b25eec8b0f3759c93bcb2c54aca1db9f8a.png";
import imgImage5 from "figma:asset/74ef61486338497c6e740f722ff2ffcc8fe76d50.png";
import imgImage6 from "figma:asset/01e851303400652197baccefb81a6cc03bc0711c.png";
import imgImage7 from "figma:asset/53fc9b7bd8060955d79a9cc6942052612d15a006.png";
import imgImage8 from "figma:asset/5955ed1fe9f3dffa5dbab928308ed300787adbab.png";
import imgImage9 from "figma:asset/b3d92bff26473a4a3c9dbf3ad55b6b18d6b7b379.png";
import imgMapImage from "figma:asset/a69c8495dcaf009e877f7edc68539b20116054e3.png";
```

### WhatIDo.tsx (7 images)
```typescript
import imgALaptop from "figma:asset/7dcf1eb305e49fd56df2eeff8def30d58bbb6d5d.png";
import imgStadium from "figma:asset/8e1bd3beb4e3e6b53e47961132127b1fde8b63f7.png";
import imgWomanWatermelon from "figma:asset/f8cadad5c36cf0a9e65fee88dc37fc6b99d1c9df.png";
import imgFearlessGirl from "figma:asset/1a441e52b3c110b807b42a4823f056f49e15ab21.png";
import imgModular from "figma:asset/239563a03addff58e7bdafc4ddfb926c074203fe.png";
import imgHeadspace from "figma:asset/db1b2d96183e3601eeb45fce0ed3ede80cc1760c.png";
import imgHeadspaceHero from "figma:asset/1dd5b8f086d220da8f1399bc087471b7ebacb733.png";
```

### About.tsx (9 images)
```typescript
import imgHero1 from "figma:asset/5634ab81a75f54c59c95b79fd656dd8042373dae.png";
import imgHero2 from "figma:asset/a23e9151fca78149a9c0ea3508fe35ccfce654aa.png";
import imgHero3 from "figma:asset/fe273495bb0a0c45262b4a94d82dd1c5b48be4a1.png";
import imgGlobalTeam from "figma:asset/be27d917e9042eedf0ec14a7987e9c0bc7905581.png";
import imgTaz from "figma:asset/5a58c9330aae02a8e6641c56485816a66a4bf737.png";
import imgSamuel from "figma:asset/acbd9089bc57e044ac2cfe30d9c8c779888d4202.png";
import imgDiverse1 from "figma:asset/5634ab81a75f54c59c95b79fd656dd8042373dae.png";
import imgDiversePortrait from "figma:asset/f9289bf3a0c1bf0281a07f290695eff779346f4d.png";
import imgDiverse3 from "figma:asset/fe273495bb0a0c45262b4a94d82dd1c5b48be4a1.png";
```

## Other Potential Issues

### 1. Custom Fonts
The project uses custom fonts:
- Cormorant (serif)
- Inter (sans-serif)
- Clash Grotesk Variable (sans-serif)

**Check:** `/src/styles/fonts.css` to ensure font files are properly referenced and available.

### 2. Motion Library
The project uses `motion/react` (formerly Framer Motion). Ensure it's installed:
```bash
npm install motion
```

### 3. ImageWithFallback Component
Located at `/src/app/components/figma/ImageWithFallback.tsx` - this is a protected file and should work as-is.

### 4. SVG Imports
SVG files are correctly stored in `/src/imports/` and should work without modification.

## Migration Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Fix Image Imports** (Choose one approach)
   - **Quick:** Replace all `figma:asset` imports with placeholder URLs
   - **Production:** Export images from Figma → save to `/public/assets/` → update imports

3. **Test Build**
   ```bash
   npm run dev
   ```

4. **Check Console for Errors**
   - Look for any `Cannot find module 'figma:asset'` errors
   - Fix any remaining import issues

## Package.json Dependencies

Ensure these are installed:
```json
{
  "motion": "latest",
  "react": "^18.x",
  "react-dom": "^18.x",
  "lucide-react": "latest",
  "tailwindcss": "^4.x"
}
```

## Contact Form Email Setup

The user wants contact form submissions to go to: **heincise@gmail.com**

This requires backend setup. Options:
1. **EmailJS** - Frontend-only email service
2. **Formspree** - Simple form backend
3. **Custom API** - Build your own with Node.js/Express
4. **Supabase** - Full backend solution (already mentioned in project)

The Contact form is in `/src/app/components/Contact.tsx`.

## Summary

**Main Issue:** All `figma:asset` imports (42+ total) need to be replaced with actual file paths or URLs before the project will run in Cursor AI.

**Recommended Fix:**
1. Create `/public/assets/` directory
2. Export all 42+ images from Figma
3. Name them clearly (e.g., `hero-image.png`, `feed-card-1.png`)
4. Update all imports to point to `/assets/[filename].png`

---

**Need Help?** The images are currently stored in Figma Make's virtual file system and cannot be automatically extracted. You'll need to export them manually from Figma.
