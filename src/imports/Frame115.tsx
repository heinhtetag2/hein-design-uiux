function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-full">
        <p className="leading-[26px]">Learning Discovery</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[40px] text-white tracking-[-1.2px] w-full">
        <p className="leading-[48px]">The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into.</p>
      </div>
    </div>
  );
}

function MindsetSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mindset Section">
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[260px] pr-[460px] py-[90px] relative w-full">
        <Header />
        <Content />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col font-['Clash_Grotesk_Variable:Light',sans-serif] font-light gap-[8px] items-start leading-[0] pr-[210px] relative text-[16px] text-white tracking-[-0.16px] w-full">
        <div className="flex flex-col justify-center relative shrink-0 w-full">
          <p className="leading-[22.4px] whitespace-pre-wrap">
            Getting users into a system is one thing.
            <br aria-hidden="true" />
            {` Keeping them engaged is another.`}
          </p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full">
          <p className="leading-[22.4px]">EduSync approaches discovery through clarity—highlighting relevant courses, upcoming lessons, and progress cues that help students stay oriented and motivated over time.</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 w-full">
          <p className="leading-[22.4px]">By surfacing what matters most, the platform supports continuity, confidence, and long-term learning habits.</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return <div className="bg-[#1e1e1e] flex-[1_0_0] min-h-px min-w-px w-[424px]" />;
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start justify-center min-h-px min-w-px relative self-stretch">
      <Container1 />
      <Frame1 />
    </div>
  );
}

function Frame() {
  return <div className="bg-[#1e1e1e] h-[900px] shrink-0 w-[944px]" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Frame4 />
    </div>
  );
}

function ImageGrid() {
  return (
    <div className="relative shrink-0 w-full" data-name="Image Grid">
      <div className="content-start flex flex-wrap gap-y-[24px] items-start px-[24px] py-[90px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

function Image() {
  return <div className="bg-[#1e1e1e] h-[840px] shrink-0 w-full" data-name="Image" />;
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[24px] py-[90px] relative w-full">
        <Image />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-full">
        <p className="leading-[26px]">A System Designed to Scale</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[40px] text-white tracking-[-1.2px] w-full">
        <p className="leading-[48px]">Building a stable foundation that supports growth without breaking existing workflows.</p>
      </div>
    </div>
  );
}

function MindsetSection1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Mindset Section">
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[260px] pr-[460px] py-[90px] relative w-full">
        <Header1 />
        <Content1 />
      </div>
    </div>
  );
}

function Frame2() {
  return <div className="bg-[#1e1e1e] h-[748px] shrink-0 w-[1156px]" />;
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Clash_Grotesk_Variable:Light',sans-serif] font-light gap-[8px] items-start leading-[0] min-h-px min-w-px relative self-stretch text-[16px] text-white tracking-[-0.16px]">
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[22.4px]">As learning platforms grow, design systems become more important than individual screens. EduSync was built around reusable components, clear content structures, and predictable states—so new features can be added without rethinking the core experience.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[22.4px]">By prioritizing consistency and adaptability, the system remains reliable for schools today while staying flexible for future needs.</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Frame5 />
    </div>
  );
}

function ImageGrid1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Image Grid">
      <div className="content-start flex flex-wrap gap-y-[24px] items-start px-[24px] py-[90px] relative w-full">
        <Container2 />
      </div>
    </div>
  );
}

export default function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative size-full">
      <MindsetSection />
      <ImageGrid />
      <Frame7 />
      <MindsetSection1 />
      <ImageGrid1 />
    </div>
  );
}