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
import imgUber from "../../assets/work/joanx/laptop.webp";
import imgJoanXColors from "../../assets/work/joanx/JoanXcolorpreview.webp";
import imgMidjourney from "../../assets/work/goft/chrome-abstract.webp";
import imgUpwork from "../../assets/work/probridge/fearless-girl.webp";
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
      imgTuTuStayApp,
      imgTuTuStayPoster,
      imgTuTuStayColors,
      imgTuTuStayDoorHangers,
      imgTuTuStayAmenities,
      imgTuTuStayHuman,
      imgTuTuStaySettlementDetail,
    ],
    heroImage: imgTuTuStayBanner,
    // Pin the tall full-width feature slot to the bento-grid stats collage.
    slots: { 3: imgTuTuStayPoster },
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Stage", value: "Scale-up" },
      { label: "Deliverables", value: "UX, Brand, Web App" },
    ],
    introHeading: "Introduction",
    introText:
      "TuTuStay turns a simple idea into a finished song. It opens music creation to everyone by replacing studios and software with a single prompt — and a system that makes the result feel intentional.",
    visionHeading: "The vision",
    visionText: "Make creating music as natural as describing it.",
    collabText:
      "TuTuStay was shaped through tight collaboration between design, audio research, and engineering. Turning prompts into music meant designing for delight and trust in equal measure.",
    mindsetHeading: "The creative mindset",
    mindsetText:
      "A prompt-to-song platform that keeps the magic up front while giving creators real control over how their music sounds, evolves, and ships.",
    postersPara: [
      "Music creation has always carried a steep learning curve — tools, theory, and gear standing between an idea and a song. TuTuStay removes that distance.",
      "The interface had to feel playful enough to invite first-timers, yet precise enough that serious creators could shape every take.",
    ],
    stripText:
      "By balancing spontaneity and structure, TuTuStay feels both effortless and deep. Anyone can start with a sentence, then stay to refine, remix, and release.",
    courseHeading: "From prompt to track",
    courseText: "Describe a vibe, generate variations, and refine the take that feels right — all in one flow.",
    mosaicText:
      "Hotel operations are fragmented — bookings in one tool, rooms in another, payouts in a spreadsheet. TutuStay was designed to bring structure to that sprawl, turning scattered daily tasks into one connected workflow. To support this, I built a flexible system that adapts across roles and property sizes, balancing control with simplicity while staying ready for what comes next.",
    wideText: "Turning a sentence into a song people actually want to play.",
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
    impactTitle: "Sound at scale",
    impactLabel: "Impact",
    impactText:
      "TuTuStay was designed to make music creation feel inevitable. From first prompt to finished track, the experience drove real gains in confidence, output, and return visits across creators.",
    stats: [
      { value: "4.8", label: "Average creator rating" },
      { value: "12M", label: "Songs generated" },
      { value: "T5", label: "Top performing AI music apps" },
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
    next: { label: "ProBridge", tagline: "Intent-driven matchmaking for work", image: imgUpwork, index: "05 / 05", view: "probridge" },
  },

  probridge: {
    ...sharedImages,
    view: "probridge",
    title: "ProBridge",
    titleFont: "serif",
    protoLabel: "ProBridge",
    prototypeUrl: "https://www.upwork.com/",
    caseStudyUrl: "https://www.upwork.com/",
    images: [imgUpwork],
    meta: [
      { label: "Project Type", value: "Product Design" },
      { label: "Stage", value: "Growth" },
      { label: "Deliverables", value: "UX Research, Flows, Systems" },
    ],
    introHeading: "Introduction",
    introText:
      "ProBridge connects clients and talent across the world. This work reimagined matchmaking — replacing endless searching with intent-driven flows that pair the right people, faster.",
    visionHeading: "The vision",
    visionText: "Match people to the right work by understanding intent.",
    collabText:
      "The work combined UX research, design, and engineering to model what clients and freelancers actually want — then surface it without friction.",
    mindsetHeading: "The system mindset",
    mindsetText:
      "A marketplace that balances breadth with relevance — guiding both sides toward fit instead of leaving them to wade through endless listings.",
    postersPara: [
      "Marketplaces fail when choice becomes overwhelming — too many listings, too little signal about what actually fits.",
      "The redesign focused matchmaking on intent, surfacing the few right matches over the many possible ones.",
    ],
    stripText:
      "By designing around intent rather than search, ProBridge feels guided instead of overwhelming. Clients find fit faster, and talent reaches the work that suits them.",
    courseHeading: "Intent-driven matching",
    courseText: "Describe the need, see the right fits, and move to a conversation — without the endless scroll.",
    mosaicText:
      "Post a need, get matched to vetted talent, and start a conversation in fewer steps. Relevance is surfaced up front instead of buried in search.",
    wideText: "Turning an endless marketplace into the right match.",
    discoveryText:
      "ProBridge approaches discovery through relevance — surfacing matches, signals, and next steps that move both sides toward a confident hire.",
    thinkHeading: "Think Different",
    thinkText:
      "When the platform understands intent, matching stops feeling like searching. Surfacing the right fit at the right moment turns a marketplace into a partner.",
    gridText: "Post, match, and connect — guided by intent instead of keyword search.",
    scaleHeading: "A System Designed to Scale",
    scaleText: "A foundation that stays relevant as categories, roles, and demand keep expanding.",
    scalePara: [
      "As the marketplace grows, relevance has to scale with it. ProBridge relies on reusable patterns and predictable states.",
      "As categories and demand expand, design systems matter more than individual screens. The experience was built around reusable components and clear structures — so new flows ship without eroding relevance.",
    ],
    impactTitle: "Matching at scale",
    impactLabel: "Impact",
    impactText:
      "The redesign targeted real friction in how work gets matched. From first brief to first message, it drove measurable gains in relevance, speed, and confidence on both sides.",
    stats: [
      { value: "4.7", label: "Average match satisfaction" },
      { value: "35%", label: "Faster time-to-hire" },
      { value: "T5", label: "Top freelance platforms" },
    ],
    next: { label: "EduSync", tagline: "A unified learning workspace", image: imgEduSync, index: "01 / 05", view: "edusync" },
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
    next: { label: "EduSync", tagline: "A unified learning workspace", image: imgEduSync, index: "01 / 06", view: "edusync" },
  },
};
