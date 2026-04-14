# Cursor AI Migration Checklist

Use this checklist to ensure a smooth migration from Figma Make to Cursor AI.

## ✅ Pre-Migration Checklist

- [ ] Read README.md for project overview
- [ ] Backup your Figma design files
- [ ] Export any custom fonts you need
- [ ] Have Node.js 18+ installed
- [ ] Have npm or pnpm installed

## ✅ Initial Setup

- [ ] Open project in Cursor AI
- [ ] Run `npm install` in terminal
- [ ] Check for any installation errors
- [ ] Verify package.json dependencies installed correctly

## ✅ Fix Image Imports (CRITICAL!)

Choose one approach:

### Quick Fix (Recommended for Testing)
- [ ] Open `/QUICK_FIX_IMAGES.md`
- [ ] Replace Feed.tsx images (5 images)
- [ ] Replace EduSync.tsx images (21 images)  
- [ ] Replace WhatIDo.tsx images (7 images)
- [ ] Replace About.tsx images (9 images)
- [ ] Save all files

### Production Fix (For Final Deployment)
- [ ] Export all images from Figma
- [ ] Create `/public/assets/` folder
- [ ] Name images descriptively
- [ ] Update Feed.tsx imports
- [ ] Update EduSync.tsx imports
- [ ] Update WhatIDo.tsx imports
- [ ] Update About.tsx imports
- [ ] Test all images load correctly

## ✅ Verify Fonts

- [ ] Open `/src/styles/fonts.css`
- [ ] Check if Cormorant font loads
- [ ] Check if Inter font loads
- [ ] Check if Clash Grotesk font loads
- [ ] If missing, add fallback fonts or CDN links

## ✅ Test Development Server

- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] Open browser to localhost address
- [ ] No console errors in browser
- [ ] Home page loads correctly

## ✅ Test All Pages

- [ ] Home page displays correctly
- [ ] EduSync case study loads
- [ ] What I Do page works
- [ ] Blogs page appears
- [ ] About page shows
- [ ] Contact form displays

## ✅ Test Interactive Features

- [ ] Top navigation works
- [ ] Sidebar navigation clicks work
- [ ] Page transitions animate smoothly
- [ ] Custom cursor appears (desktop)
- [ ] Command bar opens (Cmd/Ctrl + K)
- [ ] Dark/Light mode toggle works
- [ ] Feed cards are clickable
- [ ] Horizontal scroll works on EduSync
- [ ] All hover states work

## ✅ Test Responsive Design

- [ ] Open browser DevTools
- [ ] Test mobile viewport (375px)
- [ ] Test tablet viewport (768px)
- [ ] Test desktop viewport (1440px)
- [ ] Test large desktop (1920px+)
- [ ] Check all pages at different sizes
- [ ] Verify no horizontal overflow

## ✅ Fix Any Errors

Common issues to check:

- [ ] No "Cannot find module" errors
- [ ] No 404 errors for images
- [ ] No font loading failures
- [ ] No TypeScript errors
- [ ] No console warnings (optional)

## ✅ Contact Form Setup (Optional)

Choose one method:

### EmailJS (Recommended)
- [ ] Create EmailJS account
- [ ] Connect Gmail (heincise@gmail.com)
- [ ] Create email template
- [ ] Get Service ID, Template ID, Public Key
- [ ] Install @emailjs/browser package
- [ ] Update Contact.tsx with EmailJS code
- [ ] Test form submission
- [ ] Verify email received

### Formspree (Simplest)
- [ ] Create Formspree account
- [ ] Create new form
- [ ] Set email to heincise@gmail.com
- [ ] Get form endpoint URL
- [ ] Update Contact.tsx form action
- [ ] Add name attributes to inputs
- [ ] Test form submission
- [ ] Verify email received

### Custom Backend (Advanced)
- [ ] Create Node.js API server
- [ ] Set up Nodemailer
- [ ] Configure Gmail App Password
- [ ] Deploy API server
- [ ] Update Contact.tsx to call API
- [ ] Test form submission
- [ ] Verify email received

## ✅ Performance Optimization (Optional)

- [ ] Check Lighthouse score
- [ ] Optimize image sizes
- [ ] Enable lazy loading
- [ ] Minify production build
- [ ] Test bundle size

## ✅ Content Customization

- [ ] Update personal information
- [ ] Replace placeholder text
- [ ] Add your actual projects
- [ ] Update social media links
- [ ] Customize color scheme (optional)
- [ ] Add your logo/branding

## ✅ Production Build

- [ ] Run `npm run build`
- [ ] Build completes without errors
- [ ] Check /dist folder created
- [ ] Test production preview
- [ ] Verify all assets included

## ✅ Deployment

Choose hosting platform:

### Vercel (Recommended)
- [ ] Install Vercel CLI
- [ ] Run `vercel` command
- [ ] Connect to GitHub (optional)
- [ ] Set environment variables
- [ ] Deploy and test

### Netlify
- [ ] Create Netlify account
- [ ] Drag /dist folder to deploy
- [ ] Or connect GitHub repo
- [ ] Configure build settings
- [ ] Deploy and test

### Other Hosting
- [ ] Configure hosting settings
- [ ] Upload build files
- [ ] Test deployed site
- [ ] Configure custom domain (optional)

## ✅ Post-Deployment

- [ ] Test live site on mobile device
- [ ] Test live site on different browsers
- [ ] Verify contact form works in production
- [ ] Check all images load
- [ ] Test all page transitions
- [ ] Share with friends for feedback

## ✅ Maintenance

- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Monitor contact form submissions
- [ ] Update portfolio projects regularly
- [ ] Keep dependencies updated
- [ ] Backup code to GitHub

## 📝 Notes Section

Use this space to track any custom changes or issues:

```
Date: ___________
Issue: _________________________________
Solution: ______________________________

Date: ___________
Issue: _________________________________
Solution: ______________________________

Date: ___________
Issue: _________________________________
Solution: ______________________________
```

## 🎉 Completion

Once all items are checked:

- [ ] Project runs in Cursor AI
- [ ] All pages work correctly
- [ ] Contact form sends emails
- [ ] Images display properly
- [ ] Site is deployed
- [ ] Customized with your content

**Congratulations! Your portfolio is live! 🚀**

---

## Quick Reference

**Most Important Files:**
- README.md - Start here
- QUICK_FIX_IMAGES.md - Fix images fast
- CONTACT_FORM_SETUP.md - Email setup
- CURSOR_MIGRATION_GUIDE.md - Troubleshooting

**Key Commands:**
```bash
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production
```

**Common Issues:**
1. Image imports → See QUICK_FIX_IMAGES.md
2. Module errors → Run npm install
3. Font issues → Check fonts.css
4. Port in use → Change in vite.config.ts

**Need Help?**
Check the documentation files or the troubleshooting section in CURSOR_MIGRATION_GUIDE.md
