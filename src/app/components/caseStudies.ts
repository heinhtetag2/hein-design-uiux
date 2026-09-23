import type { CaseStudyData } from "./CaseStudyTemplate";

// Per-project content for the shared CaseStudyTemplate. Each entry drives the
// same layout EduSync uses — only copy and imagery differ. Image slots cycle
// through each project's own `images` pool; the three shared image slots reuse
// the EduSync stills until project-specific imagery exists.

// Project imagery (each project currently ships 1–2 assets).
import imgSuno from "../../assets/work/twostay/abstract-glow.webp";
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
import imgUber from "../../assets/work/joanx/laptop.webp";
import imgJoanXColors from "../../assets/work/joanx/JoanXcolorpreview.webp";
import imgMidjourney from "../../assets/work/goft/chrome-abstract.webp";
import imgHeadspaceCover from "../../assets/work/cardo/cover.webp";
import imgHeadspaceFull from "../../assets/work/cardo/full.webp";
import imgEduSync from "../../assets/work/edusync/hover-cover.webp";

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
    caseStudyUrl: "https://suno.com/",
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
      { label: "Stage", value: "Scale-up" },
      { label: "Deliverables", value: "UX, Brand, Web App" },
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
      "TuTuStay approaches discovery through momentum — surfacing styles, remixes, and community tracks that keep creators in flow and coming back.",
    thinkHeading: "Think Different",
    thinkText:
      "When making music feels like play, people make more of it. TuTuStay turns a tool into a place creators return to — not just open once.",
    gridText: "Generate, remix, and extend — every track stays editable end to end.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that grows with new models and styles without breaking the creative flow.",
    scalePara: [
      "As the model improves, the experience has to stay simple. TuTuStay is built on reusable patterns and predictable states.",
      "As generative audio evolves, design systems matter more than screens. TuTuStay was built around reusable components and predictable states — so new capabilities slot in without rethinking the core experience.",
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
    next: { label: "JoanX", tagline: "A calmer everyday ride experience", image: imgUber, index: "03 / 05", view: "joanx" },
  },

  joanx: {
    ...sharedImages,
    view: "joanx",
    title: "JoanX",
    titleFont: "serif",
    protoLabel: "JoanX",
    prototypeUrl: "https://www.uber.com/",
    caseStudyUrl: "https://www.uber.com/",
    images: [imgUber, imgJoanXColors],
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Stage", value: "Enterprise" },
      { label: "Deliverables", value: "UX Research, App, Systems" },
    ],
    introHeading: "Introduction",
    introText:
      "JoanX moves millions of people every day. This work reimagined the everyday ride — reducing friction for drivers and riders so each trip feels faster, clearer, and calmer.",
    visionHeading: "The vision",
    visionText: "Make every ride feel effortless from request to arrival.",
    collabText:
      "The work spanned design, research, and engineering across regions. At JoanX's scale, small clarity wins compound into millions of smoother trips.",
    mindsetHeading: "The system mindset",
    mindsetText:
      "A ride experience that balances operational complexity with calm — keeping drivers focused on the road and riders confident in the journey.",
    postersPara: [
      "Ride-hailing is dense with information — routes, fares, ETAs, and status all competing for attention in the moment that matters most.",
      "The redesign cut noise to the essentials, surfacing the next action and letting everything else recede until it's needed.",
    ],
    stripText:
      "By prioritizing the next decision over raw data, the experience feels calmer and faster. Drivers stay focused, riders stay informed, and trips simply flow.",
    courseHeading: "The driver experience",
    courseText: "Clear next steps, fewer taps, and confident navigation — designed for the realities of the road.",
    mosaicText:
      "Accept, navigate, and complete a trip with the fewest interactions possible. Earnings, routing, and status live in one calm, glanceable view.",
    wideText: "Turning a complex system into a single confident next step.",
    discoveryText:
      "JoanX approaches discovery through context — surfacing the right route, fare, and timing cues exactly when a decision needs to be made.",
    thinkHeading: "Think Different",
    thinkText:
      "When the interface does the thinking, the trip gets easier. Surfacing the right action at the right moment turns a utility into something people trust.",
    gridText: "Navigate, earn, and complete trips with a flow built around real-world driving.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that works across cities, languages, and devices without breaking the core flow.",
    scalePara: [
      "At a global scale, consistency beats novelty. JoanX's patterns stay predictable across every market.",
      "As the platform spans cities and modes, design systems matter more than individual screens. The experience was built around reusable components and predictable states — so new markets and features ship without rethinking the core.",
    ],
    impactTitle: "Motion at scale",
    impactLabel: "Impact",
    impactText:
      "The redesign targeted real friction in everyday trips. From request to drop-off, it delivered measurable gains in speed, clarity, and rider and driver confidence.",
    stats: [
      { value: "4.9", label: "Average trip rating" },
      { value: "28%", label: "Faster request-to-pickup" },
      { value: "T3", label: "Top rated mobility apps" },
    ],
    next: { label: "Goft", tagline: "The original prompt-to-image interface", image: imgMidjourney, index: "04 / 05", view: "goft" },
  },

  goft: {
    ...sharedImages,
    view: "goft",
    title: "Goft",
    titleFont: "serif",
    protoLabel: "Goft",
    prototypeUrl: "https://www.midjourney.com/",
    caseStudyUrl: "https://www.midjourney.com/",
    images: [imgMidjourney],
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Stage", value: "0 → 1" },
      { label: "Deliverables", value: "Product Strategy, UX, Web" },
    ],
    introHeading: "Introduction",
    introText:
      "Goft redefined how people make images. This work crafted the original interface for the world's leading prompt-to-image service — giving boundless creativity a structure people could navigate.",
    visionHeading: "The vision",
    visionText: "Give limitless image generation a home people can navigate.",
    collabText:
      "The interface grew alongside the model through close work between design, research, and engineering — clarity and speed mattered as the community scaled fast.",
    mindsetHeading: "The creative mindset",
    mindsetText:
      "A prompt-to-image platform that keeps generation fluid while giving creators ways to organize, revisit, and refine an ever-growing body of work.",
    postersPara: [
      "Generative imagery produces more output than any traditional tool — the challenge shifts from making images to managing them.",
      "The interface had to make exploration feel infinite while keeping every result findable, comparable, and easy to iterate on.",
    ],
    stripText:
      "By balancing open exploration with real structure, Goft feels both boundless and organized. Creators chase ideas freely, then shape them with intent.",
    courseHeading: "From prompt to image",
    courseText: "Write, generate, upscale, and vary — an iterative loop designed for creative momentum.",
    mosaicText:
      "Type a prompt, branch into variations, and upscale the ones that land. Every image stays organized, reusable, and ready to push further.",
    wideText: "Turning endless generation into an experience people can steer.",
    discoveryText:
      "Goft approaches discovery through inspiration — surfacing community creations, styles, and prompts that spark the next idea.",
    thinkHeading: "Think Different",
    thinkText:
      "When exploration feels limitless yet organized, creativity compounds. The ability to find and refine the right image turns a generator into a creative home.",
    gridText: "Generate, vary, and upscale — every result stays organized and reusable.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that keeps pace with rapid model leaps without losing the creators who rely on it.",
    scalePara: [
      "As the model evolves weekly, the experience has to stay stable. Goft leans on reusable patterns and predictable states.",
      "As generative models advance, design systems matter more than individual screens. The interface was built around reusable components and clear structures — so new capabilities arrive without disrupting the creative flow.",
    ],
    impactTitle: "Imagination at scale",
    impactLabel: "Impact",
    impactText:
      "Goft was designed to make image generation feel limitless yet usable. From first prompt to refined render, it drove real gains in output, retention, and creative confidence.",
    stats: [
      { value: "4.9", label: "Average creator rating" },
      { value: "20M", label: "Community members" },
      { value: "T1", label: "Leading prompt-to-image tools" },
    ],
    next: { label: "ProBridge", tagline: "A unified learning workspace", image: imgEduSync, index: "01 / 04", view: "edusync" },
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
      { label: "Stage", value: "Mature product" },
      { label: "Deliverables", value: "UX, Brand, Mobile" },
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
    next: { label: "ProBridge", tagline: "A unified learning workspace", image: imgEduSync, index: "01 / 04", view: "edusync" },
  },
};
