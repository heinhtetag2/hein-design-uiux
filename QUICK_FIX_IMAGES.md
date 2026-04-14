# Quick Fix: Replace figma:asset with Unsplash Placeholders

This is a **temporary solution** to get the project running quickly in Cursor AI. For production, you should export the actual images from Figma.

## Replace Instructions

### 1. Feed.tsx
Replace lines 2-6 with:
```typescript
// Temporary placeholder images - replace with actual assets
const imgB649 = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop"; // Abstract art
const imgP0B7 = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=500&fit=crop"; // Portrait 1
const imgP4Ac = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop"; // Portrait 2
const imgP2B9 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"; // Portrait 3
const imgA4A8 = "https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=500&h=500&fit=crop"; // Video thumbnail
```

### 2. EduSync.tsx
Replace lines 4-24 with:
```typescript
// Temporary placeholder images - replace with actual assets from Figma
const imgHero = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&h=840&fit=crop"; // Team collaboration
const imgVideo = "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1800&h=782&fit=crop"; // Education/classroom
const imgFrame78 = "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&h=778&fit=crop"; // Modern workspace
const imgFrame79 = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=782&fit=crop"; // Team meeting
const imgFrame80 = "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900&h=384&fit=crop"; // Workspace detail
const imgApp1 = "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=460&h=568&fit=crop"; // App interface 1
const imgApp2 = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=576&h=456&fit=crop"; // App interface 2
const imgApp3 = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=460&h=568&fit=crop"; // App interface 3
const imgImage1 = "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1800&h=840&fit=crop"; // Wide classroom
const imgFrame81 = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=617&h=782&fit=crop"; // Student learning
const imgFrame82 = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=400&fit=crop"; // Dashboard view
const imgFrame83 = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=900&h=400&fit=crop"; // Analytics view
const imgImage2 = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1800&h=840&fit=crop"; // Wide tech image
const imgImage3 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1440&h=748&fit=crop"; // Team collaboration 2
const imgImage4 = "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&h=782&fit=crop"; // Detail shot 1
const imgImage5 = "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=782&fit=crop"; // Detail shot 2
const imgImage6 = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=600&fit=crop"; // Work environment
const imgImage7 = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop"; // Team huddle
const imgImage8 = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=782&fit=crop"; // Individual focus
const imgImage9 = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=782&fit=crop"; // Professional portrait
const imgMapImage = "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=1800&h=900&fit=crop"; // Map/location visual
```

### 3. WhatIDo.tsx
Replace lines 4-10 with:
```typescript
// Temporary placeholder images - replace with actual assets
const imgALaptop = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=800&fit=crop"; // Laptop workspace
const imgStadium = "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&h=800&fit=crop"; // Stadium/venue
const imgWomanWatermelon = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop"; // Lifestyle portrait
const imgFearlessGirl = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1200&fit=crop"; // Confident woman
const imgModular = "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200&h=800&fit=crop"; // Modern architecture
const imgHeadspace = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop"; // Meditation/wellness
const imgHeadspaceHero = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&h=900&fit=crop"; // Peaceful landscape
```

### 4. About.tsx
Replace lines 7-15 with:
```typescript
// Temporary placeholder images - replace with actual assets
const imgHero1 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"; // Professional woman 1
const imgHero2 = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop"; // Professional woman 2
const imgHero3 = "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&h=800&fit=crop"; // Professional woman 3
const imgGlobalTeam = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=900&fit=crop"; // Global team
const imgTaz = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"; // Team member 1
const imgSamuel = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"; // Team member 2
const imgDiverse1 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"; // Diverse team 1
const imgDiversePortrait = "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=600&fit=crop"; // Portrait
const imgDiverse3 = "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&h=800&fit=crop"; // Diverse team 3
```

## How to Apply

1. Open each file in Cursor AI
2. Find the import statements at the top
3. Delete the `import ... from "figma:asset/..."` lines
4. Add the const declarations instead
5. Save the file

## Important Notes

- These are **placeholder images** from Unsplash
- They are **royalty-free** for development use
- For production, you MUST export the actual images from Figma
- The sizes (w and h parameters) match the approximate dimensions needed

## After Applying Quick Fix

Run:
```bash
npm install
npm run dev
```

The project should now run without import errors!

## Next Steps for Production

1. Export all images from your Figma design
2. Create `/public/assets/` folder
3. Save images with descriptive names
4. Replace the Unsplash URLs with `/assets/[filename]` paths
5. Commit the actual assets to your repository
