import type { CaseStudyData } from "./CaseStudyTemplate";

// Per-project content for the shared CaseStudyTemplate. Each entry drives the
// same layout EduSync uses — only copy and imagery differ. Image slots cycle
// through each project's own `images` pool; the three shared image slots reuse
// the EduSync stills until project-specific imagery exists.

// Project imagery (each project currently ships 1–2 assets).
import imgSuno from "../../assets/work/twostay/tufight.webp";
import imgTuTuStayColors from "../../assets/work/twostay/tu2staycolorpreviews.webp";
import imgTuTuStayBanner from "../../assets/work/twostay/Mockbanner.png";
import imgTuTuStayRooms from "../../assets/work/twostay/rooms-overview.webp";
import imgTuTuStayApp from "../../assets/work/twostay/app-mockup.webp";
import imgTuTuStayPoster from "../../assets/work/twostay/macbook-hands.webp";
import imgTuTuStayDoorHangers from "../../assets/work/twostay/door-hangers.webp";
import imgTuTuStayAmenities from "../../assets/work/twostay/amenities-stat.webp";
import imgTuTuStayHuman from "../../assets/work/twostay/human.webp";
import imgTuTuStaySettlementDetail from "../../assets/work/twostay/settlement-detail.webp";
import imgTuTuStayAdCards from "../../assets/work/twostay/ad-cards.webp";
import imgTuTuStayWorkflow from "../../assets/work/twostay/workflow-plan.webp";
import imgTuTuStayStatTiles from "../../assets/work/twostay/stat-tiles.webp";
import imgTuTuStaySystemPoster from "../../assets/work/twostay/system-poster.webp";
import imgTuTuStaySettlementSupport from "../../assets/work/twostay/settlement-support.webp";
import imgTuTuStaySettlementDashboard from "../../assets/work/twostay/settlement-dashboard.webp";
import imgJoanXColors from "../../assets/work/joanx/color-palette.webp";
import imgJoanXPhones from "../../assets/work/joanx/foc.png";
import imgJoanXVillains from "../../assets/work/joanx/villain-grid.png";
import imgJoanXAltar from "../../assets/work/joanx/villain-altar.png";
import imgJoanXGrid from "../../assets/work/joanx/screens-collage.png";
import imgJoanXHandheld from "../../assets/work/joanx/parent-dashboard-handheld.png";
import imgJoanXPosterGrid from "../../assets/work/joanx/mascot-warning-screens.png";
import imgJoanXChat from "../../assets/work/joanx/weekly-safety-chat.png";
import imgJoanXKids from "../../assets/work/joanx/kids-with-villains.png";
import imgJoanXProcess from "../../assets/work/joanx/design-process.png";
import imgJoanXBanner from "../../assets/work/joanx/joanbanner.png";
import imgJoanXWalking from "../../assets/work/joanx/kids-walking-distracted.png";
import imgJoanXEggHatch from "../../assets/work/joanx/buddy-egg-hatch.png";
import imgJoanXTeenPhone from "../../assets/work/joanx/teen-checking-phone.png";
import imgJoanXBadge from "../../assets/work/joanx/first-hatch-badge.png";
import imgJoanXLockscreen from "../../assets/work/joanx/lockscreen-widget.png";
import imgJoanXOutfit from "../../assets/work/joanx/buddy-outfit-customization.png";
import imgHeadspaceCover from "../../assets/work/cardo/cover.webp";
import imgHeadspaceFull from "../../assets/work/cardo/full.webp";
import imgEduSync from "../../assets/work/probridge/Container.png";

// Shared image slots (reused across projects for now).
import overviewImage from "../../assets/work/edusync/overview-video-poster.jpg";
import systemImage from "../../assets/work/edusync/system-video-poster.jpg";
import thinkImage from "../../assets/work/edusync/think-different-video-poster.jpg";

const sharedImages = {
  overviewImage,
  posterImage: systemImage,
  thinkImage,
};

export const caseStudies: Record<string, CaseStudyData> = {
  twostay: {
    ...sharedImages,
    overviewImage: imgSuno,
    posterImage: imgTuTuStayRooms,
    view: "twostay",
    title: "TuTuStay",
    titleFont: "serif",
    protoLabel: "TuTuStay",
    prototypeUrl: "https://tutustay-manager-dashboard.vercel.app/",
    caseStudyUrl: "https://tutustay-manager-dashboard.vercel.app/showcase",
    images: [
      imgTuTuStayAdCards,
      imgTuTuStayPoster,
      imgTuTuStayDoorHangers,
      imgTuTuStayAmenities,
      imgTuTuStayHuman,
      imgTuTuStaySettlementDetail,
    ],
    heroImage: imgTuTuStayBanner,
    // Pin the tall full-width feature slot to the bento-grid stats collage.
    slots: {
      1: imgTuTuStayApp,
      2: imgTuTuStaySystemPoster,
      3: imgTuTuStayColors,
      4: imgTuTuStayWorkflow,
      5: imgTuTuStaySettlementSupport,
      6: imgTuTuStayStatTiles,
      7: imgTuTuStaySettlementDashboard,
    },
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Timeline", value: "8 weeks" },
      { label: "Tools", value: "Figma, FigJam, Claude" },
    ],
    introHeading: "Introduction",
    introText:
      "Running a property means juggling bookings, rooms, and payouts across a dozen disconnected tools. TuTuStay brings it all into one dashboard — giving hosts clarity and control, whether they're managing a single stay or a whole portfolio.",
    visionHeading: "The vision",
    visionText: "Make managing any property feel like one calm, connected system.",
    collabText:
      "TuTuStay was shaped through close collaboration between design and engineering — building a shared design system so every screen, from bookings to settlements, feels like one connected product.",
    mindsetHeading: "The creative mindset",
    mindsetText:
      "A property system that stays consistent from room to reservation to payout — one design language across every screen, so nothing feels bolted on.",
    postersPara: [
      "Property tools are usually stitched together from separate systems, each screen carrying its own patterns and logic. TuTuStay unifies them into one coherent system.",
      "The interface had to scale across very different screens — dashboards, tables, detail views — without losing a shared sense of structure and trust.",
    ],
    stripText:
      "By balancing structure with ease, TuTuStay stays close to the everyday details — a door hanger, a settlement, a guest on the line. Every touchpoint, physical or digital, fits into one connected system.",
    courseHeading: "From booking to payout",
    courseText: "See exactly how a booking becomes a payout — gross revenue, commission, and what lands in your account, laid out clearly at every step.",
    mosaicText:
      "Property operations are fragmented — bookings, rooms, and payouts scattered across separate tools. TuTuStay brings it into one connected workflow, flexible enough to adapt across roles and property sizes.",
    wideText: "Turning scattered payouts into settlements hosts can trust.",
    discoveryText:
      "TuTuStay approaches discovery through momentum — surfacing bookings, tasks, and guest activity that keep hosts in flow and coming back.",
    thinkHeading: "Think Different",
    thinkText:
      "When managing a property feels effortless, hosts actually keep up with it. TuTuStay turns a dashboard into a place hosts return to — not just open once.",
    gridText: "Book, adjust, and settle — every reservation stays editable end to end.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that grows with new properties and room types without breaking the operational flow.",
    scalePara: [
      "As a host's portfolio grows, the experience has to stay simple. TuTuStay is built on reusable patterns and predictable states.",
      "As property portfolios scale, design systems matter more than individual screens. TuTuStay was built around reusable components and predictable states — so new capabilities slot in without rethinking the core experience.",
    ],
    impactTitle: "Designed for scale",
    impactLabel: "Impact",
    impactText:
      "TuTuStay was designed to move fast without breaking consistency — a full property operations system, from dashboard to settlements, built on one design system so every screen shares the same logic and feel.",
    stats: [
      { value: "30+", label: "Screens designed" },
      { value: "5", label: "Connected modules" },
      { value: "120+", label: "Design system components" },
    ],
    next: { label: "JoanX", tagline: "A game that keeps kids looking up", image: imgJoanXHandheld, index: "03 / 03", view: "joanx" },
  },

  joanx: {
    ...sharedImages,
    overviewImage: imgJoanXProcess,
    posterImage: imgJoanXPosterGrid,
    view: "joanx",
    title: "JoanX",
    titleFont: "serif",
    protoLabel: "JoanX",
    prototypeUrl: "https://jaonx-prototype.vercel.app/",
    caseStudyUrl: "https://jaonx-prototype.vercel.app/website/ux-case-study/",
    images: [imgJoanXEggHatch, imgJoanXWalking, imgJoanXBadge, imgJoanXTeenPhone, imgJoanXOutfit, imgJoanXLockscreen],
    heroImage: imgJoanXBanner,
    slots: {
      1: imgJoanXChat,
      2: imgJoanXKids,
      3: imgJoanXGrid,
      4: imgJoanXHandheld,
      5: imgJoanXAltar,
      6: imgJoanXVillains,
      7: imgJoanXPhones,
    },
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Timeline", value: "16 weeks" },
      { label: "Tools", value: "Figma, FigJam, Claude" },
    ],
    introHeading: "Introduction",
    introText:
      "Kids look down at their phones while they walk — and that's exactly when accidents happen. JoanX turns \"look up\" into a game worth playing, while giving parents real visibility without needing to nag.",
    visionHeading: "The vision",
    visionText: "Make staying safe on a walk feel like winning, not being punished.",
    collabText:
      "The work spanned character design, product, and engineering — building a kid-facing game and a parent companion app that share one safety system underneath.",
    mindsetHeading: "The system mindset",
    mindsetText:
      "A safety product that doesn't feel like one — villains, streaks, and a buddy to raise turn \"eyes up\" into something kids want to win, not a rule they resent.",
    postersPara: [
      "Telling a kid to stop looking at their phone rarely works. JoanX reframes the habit as a villain to defeat — Ping, Vortex, Chrono, Temo — each one named after a real distraction that pulls a child's eyes down.",
      "Every walk becomes a small encounter. Look up in time and the villain backs off; ignore the warning and it escalates — the game mirrors the real risk.",
    ],
    stripText:
      "From hatching the buddy egg to clearing the villain road, every screen keeps the game moving forward — so staying safe on a walk feels like progress, not a warning.",
    courseHeading: "Meet the villains",
    courseText:
      "Ping, Vortex, Chrono, Temo — each distraction becomes a character to spot and beat, not just a rule to follow.",
    mosaicText:
      "Hatch a buddy and grow it by staying safe. Beat a villain, earn points and gear, and watch the streak climb — the game rewards the exact behavior that keeps a kid looking up.",
    wideText: "Turning a phone-down habit into a streak kids want to protect.",
    discoveryText:
      "JoanX approaches habit-building through character — each villain names one real distraction, so a child learns to notice their own patterns instead of facing one vague \"screen time\" enemy.",
    thinkHeading: "Think Different",
    thinkText:
      "When the safety system looks like a game, kids opt in instead of pushing back. Turning a warning into a character makes the lesson land without a lecture.",
    gridText: "Hatch, walk, and level up a buddy — built around a flow real kids actually want to open.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A villain roster and reward system built to grow from four habits to ten without losing clarity.",
    scalePara: [
      "As new distractions get added, the experience has to stay just as readable for a seven-year-old as it is for an eleven-year-old.",
      "The villain road, badge system, and parent alerts were all built on reusable patterns — so new characters and warning types slot in without redesigning the core game.",
    ],
    impactTitle: "Safer walks, one streak at a time",
    impactLabel: "Impact",
    impactText:
      "JoanX turns a hard parenting problem into a system both sides actually want to use — kids stay in the game, parents stay informed, and the habit that mattered — looking up — improves.",
    stats: [
      { value: "10", label: "Villains on the habit road" },
      { value: "46%", label: "Fewer risky moments in 2 weeks" },
      { value: "77%", label: "Warnings resolved immediately" },
    ],
    next: { label: "ProBridge", tagline: "Escrow-protected freelance marketplace", image: imgEduSync, index: "01 / 03", view: "edusync" },
  },

  cardo: {
    ...sharedImages,
    view: "cardo",
    title: "Cardo",
    titleFont: "serif",
    protoLabel: "Cardo",
    prototypeUrl: "https://www.headspace.com/",
    caseStudyUrl: "https://www.headspace.com/",
    images: [imgHeadspaceCover, imgHeadspaceFull],
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Timeline", value: "6 weeks" },
      { label: "Tools", value: "Figma, FigJam, Claude" },
    ],
    introHeading: "Introduction",
    introText:
      "Cardo makes calm accessible. This work shaped a meditation experience that meets people where they are — gentle, personal, and easy to return to day after day.",
    visionHeading: "The vision",
    visionText: "Make mindfulness feel personal, gentle, and easy to keep.",
    collabText:
      "The experience was shaped with design, content, and engineering working closely — calm is a feeling, and every detail had to protect it.",
    mindsetHeading: "The calm mindset",
    mindsetText:
      "A wellness experience that balances depth of content with quiet simplicity — guiding people to the right practice without ever feeling demanding.",
    postersPara: [
      "Wellness apps often overwhelm — long libraries, streak pressure, and choices that add stress rather than ease it.",
      "Cardo was designed to feel like a calm guide: surfacing one gentle next step instead of an endless menu.",
    ],
    stripText:
      "By choosing calm over completeness, Cardo feels personal and unhurried. People find the right practice in a moment, and come back because it never demands too much.",
    courseHeading: "A practice that meets you",
    courseText: "The right session for your mood and moment — surfaced gently, never demanded.",
    mosaicText:
      "Open the app, find a practice that fits how you feel, and begin in seconds. Progress is encouraging, never a source of pressure.",
    wideText: "Turning a vast library into the one practice you need now.",
    discoveryText:
      "Cardo approaches discovery through care — surfacing sessions, moods, and gentle cues that keep mindfulness a habit, not a chore.",
    thinkHeading: "Think Different",
    thinkText:
      "When an app reduces stress instead of adding it, people stay. Meeting someone with the right practice at the right moment turns a library into a daily ritual.",
    gridText: "Breathe, focus, and rest — guided by how you feel, not what you should do.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that grows the content library without ever losing its sense of calm.",
    scalePara: [
      "As the library grows, calm has to be protected. Cardo relies on reusable patterns and predictable states.",
      "As content and audiences expand, design systems matter more than individual screens. The experience was built around reusable components and clear structures — so new practices arrive without crowding the calm.",
    ],
    impactTitle: "Calm at scale",
    impactLabel: "Impact",
    impactText:
      "Cardo was designed to make mindfulness feel reachable and sustainable. From first session to lasting habit, it drove real gains in retention, wellbeing, and daily return.",
    stats: [
      { value: "4.9", label: "Star rating on App Store" },
      { value: "70M", label: "Members worldwide" },
      { value: "T3", label: "Top Health & Wellness apps" },
    ],
    next: { label: "ProBridge", tagline: "Escrow-protected freelance marketplace", image: imgEduSync, index: "01 / 04", view: "edusync" },
  },
};
