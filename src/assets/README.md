# Assets

Images and video are grouped into one folder per case study / section, so the
images for a given piece of work live together. Components import them directly
(Vite hashes and bundles each import), e.g.:

```ts
import imgHero from "../../assets/work/edusync/hero.webp";
```

Case-study folders are named after the **showcase project** they power, not
the real brand the imagery was sourced from. The folder name matches the app
`view` id in `caseStudies.ts` (e.g. `work/twostay` ⇄ `view: "twostay"`).

## Folders

```
src/assets/
  work/
    edusync/    EduSync — every image on the EduSync page (hero, video
                stills, app/frame mockups) plus the hover-* card previews.
    twostay/    TwoStay work-grid card (also the "next study" preview on EduSync).
    goft/       Goft work-grid card.
    joanx/      JoanX work-grid card (also used in What I Do).
    probridge/  ProBridge work-grid card (also used in What I Do).
    cardo/      Cardo images (work-grid card + What I Do section).
    nike/       Generic "All Work" grid card + Feed post image.
    modular/    Generic image — All Work card, What I Do, case-study hover bg.
  brand/        Brand logo SVGs (light/dark). See TopNav.tsx.
  home/         Home page background video.
  feed/         Feed component — press logos + post images.
  what-i-do/    "What I Do" section media.
  shop/         Shop product photos — see shop/README.md.
```

## Moving or adding an image

A file lives in exactly one folder; any number of components can import it from
there. If you move a file, update the `import` path in the components that use
it (search the codebase for the filename). When an image is reused across
sections, keep it in the folder of the work it most belongs to and import it
from there.
