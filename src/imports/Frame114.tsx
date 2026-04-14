import imgImage from "figma:asset/5955ed1fe9f3dffa5dbab928308ed300787adbab.png";
import imgImage1 from "figma:asset/b3d92bff26473a4a3c9dbf3ad55b6b18d6b7b379.png";

function Container1() {
  return (
    <div className="h-[30.004px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[30px] left-0 text-[#fafafa] text-[20px] top-[1.17px] tracking-[-0.2px]">Think Different</p>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.992px] items-start pl-[259.992px] pr-[459.996px] relative w-full">
        <Container1 />
        <p className="font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] relative shrink-0 text-[#fafafa] text-[40px] tracking-[-1.2px] w-[665px] whitespace-pre-wrap">The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into.</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[71.967px] relative shrink-0 w-[399.999px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[399px] whitespace-pre-wrap">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[782px] items-start relative shrink-0 w-[600px]" data-name="Container">
      <Paragraph />
      <Container4 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[781.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container7() {
  return <div className="bg-[#0a0a0a] h-[782px] shrink-0 w-full" data-name="Container" />;
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[781.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image1 />
      <Container7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[781.993px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[16px] relative w-full">
          <Container3 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[140px] items-start relative size-full">
      <Container />
      <Container2 />
    </div>
  );
}