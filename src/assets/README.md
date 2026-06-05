# Assets

Images and video are grouped into one folder per case study / section, so the
images for a given piece of work live together. Components import them directly
(Vite hashes and bundles each import), e.g.:

```ts
import imgHero from "../../assets/edu-sync/hero.png";
```

## Folders

```
src/assets/
  edu-sync/    EduSync case study — every image on the EduSync page
               (hero, video stills, app/frame mockups, map) plus the
               edusync-hover-* card previews shown in the work grid.
  midjourney/  Midjourney work-grid card.
  suno/        Suno work-grid card (also the "next study" preview on EduSync).
  nike/        Nike work-grid card.
  upwork/      Upwork work-grid card.
  uber/        Uber work-grid card.
  headspace/   Headspace images (work-grid card + What I Do section).
  modular/     Modular image (work-grid card, What I Do, case-study hover bg).
  home/        Home page background video.
  feed/        Feed component — press logos + post images.
  what-i-do/   "What I Do" section media.
  logo/        Brand logo SVGs (light/dark). See TopNav.tsx.
  shop/        Shop product photos — see shop/README.md.
  _unused/     Not referenced anywhere in the code. Kept for reference;
               safe to delete if you don't need them.
```

## Moving or adding an image

A file lives in exactly one folder; any number of components can import it from
there. If you move a file, update the `import` path in the components that use
it (search the codebase for the filename). When an image is reused across
sections, keep it in the folder of the work it most belongs to and import it
from there.
