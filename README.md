# Portfolio Website - Cursor AI Migration Package

A modern, fully responsive portfolio website with smooth animations, dark/light mode, and case study showcases.

## 🚨 Important: This Project Requires Setup Before Running

This project was built in Figma Make and uses special image imports that won't work in Cursor AI without modification.

**Before running the project, you MUST:**
1. Fix image imports (see Quick Start below)
2. Install dependencies
3. Optionally set up contact form email delivery

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Fix Images (CRITICAL!)
Follow the instructions in **QUICK_FIX_IMAGES.md** to replace all `figma:asset` imports with Unsplash placeholders.

This is required or the project won't run!

### 3. Start Dev Server
```bash
npm run dev
```

Visit `http://localhost:5173` and your site should be running!

## 📁 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main app with page routing
│   │   └── components/
│   │       ├── TopNav.tsx                   # Top navigation bar
│   │       ├── Sidebar.tsx                  # Left sidebar navigation
│   │       ├── Feed.tsx                     # Right feed cards
│   │       ├── Hero.tsx                     # Home page hero section
│   │       ├── EduSync.tsx                  # EduSync case study page
│   │       ├── WhatIDo.tsx                  # Services/What I Do page
│   │       ├── Blogs.tsx                    # Blog listing page
│   │       ├── About.tsx                    # About me page
│   │       ├── Contact.tsx                  # Contact form page
│   │       ├── AskAnything.tsx              # Command bar (Cmd+K)
│   │       ├── CustomCursor.tsx             # Custom cursor component
│   │       └── PageTransitionOverlay.tsx    # Page transition animations
│   ├── imports/                             # Figma imported components & SVGs
│   └── styles/
│       ├── fonts.css                        # Custom font imports
│       ├── index.css                        # Global styles
│       ├── tailwind.css                     # Tailwind v4 config
│       └── theme.css                        # Design system tokens
├── package.json                             # Project dependencies
├── vite.config.ts                           # Vite configuration
├── README.md                                # This file
├── SETUP_INSTRUCTIONS.md                    # Detailed setup guide
├── CURSOR_MIGRATION_GUIDE.md                # Migration troubleshooting
├── QUICK_FIX_IMAGES.md                      # Fast image fix guide
└── CONTACT_FORM_SETUP.md                    # Email setup guide
```

## ✨ Features

- ✅ **Fully Responsive** - Works on mobile, tablet, and desktop
- ✅ **Smooth Animations** - Motion animations throughout
- ✅ **Dark/Light Mode** - Theme switching support
- ✅ **Page Transitions** - Cinematic page change animations
- ✅ **Command Bar** - Context-aware "Ask Anything" (Cmd+K)
- ✅ **Custom Cursor** - Tailored cursor interactions
- ✅ **Case Studies** - EduSync project showcase
- ✅ **Contact Form** - Ready for email integration
- ✅ **Horizontal Scrolling** - Drag-to-scroll galleries
- ✅ **Reveal Animations** - Scroll-triggered image reveals

## 🛠 Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first styling
- **Motion 12.23.24** - Animation library (Framer Motion successor)
- **Radix UI** - Accessible component primitives
- **Material UI 7.3.5** - UI components
- **Lucide React** - Icon library
- **React Hook Form 7.55.0** - Form handling

## 📚 Documentation

### Essential Guides

1. **SETUP_INSTRUCTIONS.md** - Complete setup walkthrough
2. **QUICK_FIX_IMAGES.md** - 5-minute image fix (use this first!)
3. **CURSOR_MIGRATION_GUIDE.md** - Detailed migration troubleshooting
4. **CONTACT_FORM_SETUP.md** - Email delivery setup options

### Read These First

Start with **QUICK_FIX_IMAGES.md** → It's the fastest way to get running.

For troubleshooting, check **CURSOR_MIGRATION_GUIDE.md**.

## 🎨 Design System

The project uses custom fonts and a carefully crafted design system:

### Fonts
- **Cormorant** (Serif) - Headings and hero text
- **Inter** (Sans-serif) - Body text
- **Clash Grotesk Variable** (Sans-serif) - UI elements

### Colors
Defined in `/src/styles/theme.css`:
- Background colors
- Foreground colors
- Accent colors
- Muted variations

### Spacing
Standardized to 24px horizontal padding across all pages for consistency.

## 🔧 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🖼 Image Assets Issue

**Critical:** The project uses `figma:asset` imports that don't work outside Figma Make.

### Quick Fix (Development)
Replace with Unsplash placeholders - see **QUICK_FIX_IMAGES.md**

### Production Fix
1. Export images from Figma
2. Create `/public/assets/` directory
3. Save images there
4. Update imports to use `/assets/image-name.png`

**Total images to replace:** 42+

**Affected files:**
- Feed.tsx (5 images)
- EduSync.tsx (21 images)
- WhatIDo.tsx (7 images)
- About.tsx (9 images)

## 📧 Contact Form Setup

The contact form needs email integration to send to **heincise@gmail.com**.

See **CONTACT_FORM_SETUP.md** for three setup options:

1. **EmailJS** (Recommended) - Free, no backend needed
2. **Formspree** (Easiest) - Just add form action URL
3. **Custom API** (Advanced) - Full control with Node.js

## 🚧 Known Issues

### ⚠️ Will Cause Errors
- `figma:asset` imports - MUST be fixed before running
- Missing image files - Use placeholder URLs temporarily

### ✅ Already Fixed
- Edge-to-edge layouts on EduSync page
- Horizontal padding standardization (24px)
- Typography consistency
- Responsive design across breakpoints

## 📱 Pages & Routes

The app uses view-based routing (not React Router):

- **Home** (`currentView: "home"`)
  - Hero section
  - Sidebar with case studies
  - Feed with work cards

- **EduSync** (`currentView: "edusync"`)
  - Full case study
  - Scrolling animations
  - Image galleries

- **What I Do** (`currentView: "what-i-do"`)
  - Services overview
  - Image showcases

- **Blogs** (`currentView: "blogs"`)
  - Blog post listings

- **About Me** (`currentView: "about"`)
  - Team information
  - City globe animation

- **Get in Touch** (`currentView: "contact"`)
  - Contact form
  - Social links

## 🎯 Next Steps

After getting the project running:

1. ✅ Test all pages and interactions
2. ✅ Replace placeholder images with real assets
3. ✅ Set up contact form email delivery
4. ✅ Customize content and copy
5. ✅ Add your actual portfolio projects
6. ✅ Deploy to hosting (Vercel, Netlify, etc.)

## 🌐 Deployment

This is a static React app that can be deployed to:

- **Vercel** (Recommended)
  ```bash
  npm install -g vercel
  vercel
  ```

- **Netlify**
  ```bash
  npm run build
  # Upload /dist folder
  ```

- **GitHub Pages**
  - Build the project
  - Push /dist to gh-pages branch

## 🔒 Security Notes

- Don't commit API keys to Git
- Use environment variables for secrets
- Enable domain restrictions on EmailJS
- Use Gmail App Passwords for SMTP

## 💡 Tips

- **Custom Cursor:** Works on desktop, hidden on mobile
- **Command Bar:** Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- **Dark Mode:** Theme toggle in TopNav
- **Smooth Scrolling:** Enabled on all animated elements
- **Page Transitions:** 800ms cinematic animations

## 🐛 Troubleshooting

### "Cannot find module 'figma:asset'"
→ You haven't fixed the image imports yet. See **QUICK_FIX_IMAGES.md**

### "Module not found: motion/react"
→ Run `npm install motion`

### Fonts not loading
→ Check `/src/styles/fonts.css` and verify font file paths

### Images not appearing
→ Check browser console for 404 errors, verify image paths

For more help, see **CURSOR_MIGRATION_GUIDE.md**

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Read the relevant guide in docs
3. Verify all setup steps were followed
4. Check Node.js version (need 18+)

## 📄 License

Private project - All rights reserved

## 👤 Author

**Hein Htet**
- Email: heincise@gmail.com

---

**Ready to start?** 

1. Run `npm install`
2. Follow **QUICK_FIX_IMAGES.md**
3. Run `npm run dev`
4. Visit `http://localhost:5173`

Enjoy your new portfolio! 🎉
