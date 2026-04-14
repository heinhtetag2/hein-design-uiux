import imgImage from "figma:asset/2adfbf209eadb16469e199fbca27f8b4691a513f.png";
import imgImage1 from "figma:asset/d7e9594efbc1437a46cb4ab6ebd5249ccaa232df.png";

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
    <div className="h-[686.027px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container4() {
  return <div className="bg-[#0a0a0a] h-[686px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col h-[686.027px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image />
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[782px] items-start justify-between relative shrink-0 w-[617px]" data-name="Container">
      <Paragraph />
      <Container2 />
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

export default function Container() {
  return (
    <div className="content-stretch flex gap-[24px] items-center px-[16px] relative size-full" data-name="Container">
      <Container1 />
      <Container5 />
    </div>
  );
}