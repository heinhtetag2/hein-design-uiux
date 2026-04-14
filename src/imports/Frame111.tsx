import imgImage from "figma:asset/b1ae1dc4e5ce02ea12b387406cc8b83e659cadc5.png";

function Container1() {
  return (
    <div className="h-[30.004px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[30px] left-0 text-[#fafafa] text-[20px] top-[1.17px] tracking-[-0.2px]">New Discovery</p>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.992px] items-start pl-[259.992px] pr-[459.996px] relative w-full">
        <Container1 />
        <p className="font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] relative shrink-0 text-[#fafafa] text-[40px] tracking-[-1.2px] w-[610px] whitespace-pre-wrap">The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into.</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[747.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#0a0a0a] h-[748px] shrink-0 w-full" data-name="Container" />;
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[747.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[747.993px] items-start left-[16px] overflow-clip top-0 w-[1136.378px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex-[1_0_0] h-[71.967px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[197px] whitespace-pre-wrap">Structuring learning through clear roles, reviews, and workflows.</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex h-[747.993px] items-start left-[1176.37px] top-0 w-[208.076px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[747.993px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container6 />
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