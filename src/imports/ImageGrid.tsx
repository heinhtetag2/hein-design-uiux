function Frame() {
  return <div className="bg-[#1e1e1e] h-[748px] shrink-0 w-[1156px]" />;
}

function Frame1() {
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

function Frame2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Frame2 />
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