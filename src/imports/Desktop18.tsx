import svgPaths from "./svg-0655c4to0v";
import imgImage from "figma:asset/57f055016ef62f33277aea03ab02a36a70a90b55.png";

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] relative w-full">
          <div className="flex flex-col font-['Cormorant:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[160px] text-center text-white tracking-[-2.1px] whitespace-nowrap">
            <p className="leading-[168px]">EduSync</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Term() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Term">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-white tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">Project Type</p>
      </div>
    </div>
  );
}

function Details() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Details">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#79767a] text-[16px] tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">Full Product System</p>
      </div>
    </div>
  );
}

function Descriptions() {
  return (
    <div className="content-stretch flex flex-col h-[67.25px] items-start pb-[0.75px] relative shrink-0 w-[448px]" data-name="Descriptions">
      <Term />
      <Details />
    </div>
  );
}

function Term1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Term">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-white tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">Stage</p>
      </div>
    </div>
  );
}

function Details1() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Details">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#79767a] text-[16px] tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">Concept · MVP-ready</p>
      </div>
    </div>
  );
}

function Descriptions1() {
  return (
    <div className="content-stretch flex flex-col h-[67.25px] items-start pb-[0.75px] relative shrink-0 w-[212px]" data-name="Descriptions">
      <Term1 />
      <Details1 />
    </div>
  );
}

function Term2() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-[577px]" data-name="Term">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-white tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">Deliverables</p>
      </div>
    </div>
  );
}

function Details2() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Details">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#79767a] text-[16px] tracking-[-0.16px] w-full">
        <p className="leading-[22.4px] whitespace-pre-wrap">UX Strategy · Dashboard Design · Workflow System</p>
      </div>
    </div>
  );
}

function Descriptions2() {
  return (
    <div className="content-stretch flex flex-col h-[67px] items-start pb-[0.75px] relative shrink-0 w-[400px]" data-name="Descriptions">
      <Term2 />
      <Details2 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[10px] px-[24px] relative w-full">
          <Descriptions />
          <Descriptions1 />
          <Descriptions2 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[70px] items-center relative shrink-0 w-full">
      <Title />
      <Container />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[840px] relative shrink-0 w-full" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1e1e1e] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgImage} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[90px] relative shrink-0 w-full" data-name="Container">
      <Image />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full">
      <Frame3 />
      <Container1 />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">Introduction</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[56px] text-white tracking-[-1.12px] w-full">
        <p className="leading-[67.76px] whitespace-pre-wrap">EduSync brings clarity to how schools manage learning. It connects administrators, teachers, and students through structured workflows that reduce friction and keep learning focused.</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[24px] pr-[260px] py-[90px] relative w-full">
        <Header />
        <Content />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">The vision</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[40px] text-white tracking-[-1.2px] w-full">
        <p className="leading-[48px] whitespace-pre-wrap">Build a system where learning flows naturally without operational noise.</p>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[260px] pr-[496px] py-[90px] relative w-full">
        <Header1 />
        <Content1 />
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[-0.2px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">The Nature of Learning</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[40px] text-white tracking-[-1.2px] w-full">
        <p className="leading-[48px] whitespace-pre-wrap">Learning is most effective when structure feels invisible supporting focus, consistency, and momentum while adapting to real classroom complexity.</p>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[260px] pr-[496px] py-[90px] relative w-full">
        <Header2 />
        <Content2 />
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Intro Section">
      <Section />
      <Section1 />
      <Section2 />
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-center px-[16px] relative rounded-[999px] shrink-0" data-name="Menu">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[999px]" />
      <div className="flex flex-col font-['Clash_Grotesk_Variable:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white tracking-[-0.12px] whitespace-nowrap">
        <p className="leading-[12px]">Menu</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex font-['Clash_Grotesk_Variable:Light',sans-serif] font-light gap-[2px] items-center leading-[0] relative shrink-0 text-[12px] text-right text-white tracking-[-0.12px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[14.4px]">LDN</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[14.4px]">5:32 AM</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p228d1600} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[8px] relative shrink-0 w-[10px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 8">
        <g id="SVG">
          <path d={svgPaths.p2da61a00} id="Vector" stroke="var(--stroke-0, white)" />
          <path d={svgPaths.p234cb200} id="Vector_2" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[22px]" data-name="Frame">
      <Svg />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35484 9.20151">
          <path d={svgPaths.p996def0} fill="var(--fill-0, white)" id="Star 1" />
        </svg>
      </div>
      <div className="bg-white h-[9.032px] rounded-tr-[2.581px] shrink-0 w-[9.355px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-end left-[calc(50%-4px)] top-1/2" data-name="Frame">
      <div className="h-[18.234px] relative shrink-0 w-[15.323px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3226 18.2338">
          <path d={svgPaths.p6e9c80} fill="var(--fill-0, white)" id="Vector 2" />
        </svg>
      </div>
      <div className="h-[18.234px] relative shrink-0 w-[15.323px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3226 18.2338">
          <path d={svgPaths.p6e9c80} fill="var(--fill-0, white)" id="Vector 2" />
        </svg>
      </div>
      <div className="flex flex-row items-end self-stretch">
        <Frame5 />
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[10px] bg-[rgba(186,186,186,0.2)] content-center flex flex-wrap h-[54px] items-center justify-between left-1/2 px-[24px] rounded-[9999px] top-[10px] w-[645px]" data-name="Header">
      <Menu />
      <Container2 />
      <Frame2 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-black content-stretch flex flex-col items-start pt-[140px] relative size-full" data-name="Desktop - 18">
      <Frame4 />
      <IntroSection />
      <Header3 />
    </div>
  );
}