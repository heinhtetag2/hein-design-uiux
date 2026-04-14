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

function Frame2() {
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

function Frame3() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Frame3 />
    </div>
  );
}

export default function ImageGrid() {
  return (
    <div className="content-start flex flex-wrap gap-y-[24px] items-start px-[24px] py-[90px] relative size-full" data-name="Image Grid">
      <Container />
    </div>
  );
}