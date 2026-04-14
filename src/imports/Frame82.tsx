function Container() {
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

function Frame() {
  return <div className="bg-[#1e1e1e] flex-[1_0_0] min-h-px min-w-px w-[424px]" />;
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative size-full">
      <Container />
      <Frame />
    </div>
  );
}