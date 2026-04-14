import imgImage from "figma:asset/2adfbf209eadb16469e199fbca27f8b4691a513f.png";
import imgImage1 from "figma:asset/d7e9594efbc1437a46cb4ab6ebd5249ccaa232df.png";
import imgImage2 from "figma:asset/5eb982b5824319bd5a74858110b312dc486a0a1e.png";
import imgImage3 from "figma:asset/cc9e89b25eec8b0f3759c93bcb2c54aca1db9f8a.png";
import imgImage4 from "figma:asset/74ef61486338497c6e740f722ff2ffcc8fe76d50.png";
import imgImage5 from "figma:asset/01e851303400652197baccefb81a6cc03bc0711c.png";
import imgImage6 from "figma:asset/53fc9b7bd8060955d79a9cc6942052612d15a006.png";
import imgImage7 from "figma:asset/f0ec07ca565c1a95fda88e2cb24343fa120c072c.png";
import imgImage8 from "figma:asset/5955ed1fe9f3dffa5dbab928308ed300787adbab.png";
import imgImage9 from "figma:asset/b3d92bff26473a4a3c9dbf3ad55b6b18d6b7b379.png";

function Container1() {
  return (
    <div className="h-[30.004px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[30px] left-0 text-[#fafafa] text-[20px] top-[1.17px] tracking-[-0.2px]">Course Management</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[100.012px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] left-0 text-[#fafafa] text-[40px] top-[0.9px] tracking-[-1.2px] w-[608px] whitespace-pre-wrap">Structuring learning through clear roles, reviews, and workflows.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[162.008px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.992px] items-start pl-[259.992px] pr-[459.996px] relative size-full">
        <Container1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Paragraph1() {
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
      <Paragraph1 />
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

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[128px] items-start relative shrink-0 w-full">
      <Container />
      <Container2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[747.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container11() {
  return <div className="bg-[#0a0a0a] h-[748px] shrink-0 w-full" data-name="Container" />;
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col h-[747.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image2 />
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[747.993px] items-start left-[16px] overflow-clip top-0 w-[1136.378px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="flex-[1_0_0] h-[71.967px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[197px] whitespace-pre-wrap">Structuring learning through clear roles, reviews, and workflows.</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[747.993px] items-start left-[1176.37px] top-0 w-[208.076px]" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[747.993px] relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container12 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container8 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[71.967px] relative shrink-0 w-[399.999px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[399px] whitespace-pre-wrap">Record a beat or hum a tune using the audio prompt and watch it turn into your new favourite song.</p>
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image3 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[782px] items-start relative shrink-0 w-[600px]" data-name="Container">
      <Paragraph3 />
      <Container15 />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[781.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
    </div>
  );
}

function Container18() {
  return <div className="bg-[#0a0a0a] h-[782px] shrink-0 w-full" data-name="Container" />;
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col h-[781.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image4 />
      <Container18 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[781.993px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Container17 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[16px] relative w-full">
          <Container14 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[30.004px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[30px] left-0 text-[#fafafa] text-[20px] top-[1.17px] tracking-[-0.2px]">Think Different</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.992px] items-start pl-[259.992px] pr-[459.996px] relative w-full">
        <Container20 />
        <p className="font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] relative shrink-0 text-[#fafafa] text-[40px] tracking-[-1.2px] w-[665px] whitespace-pre-wrap">The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into.</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[71.967px] relative shrink-0 w-[399.999px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[399px] whitespace-pre-wrap">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
      </div>
    </div>
  );
}

function Image5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image5 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[782px] items-start relative shrink-0 w-[600px]" data-name="Container">
      <Paragraph4 />
      <Container23 />
    </div>
  );
}

function Image6() {
  return (
    <div className="h-[781.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
    </div>
  );
}

function Container26() {
  return <div className="bg-[#0a0a0a] h-[782px] shrink-0 w-full" data-name="Container" />;
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col h-[781.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image6 />
      <Container26 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[781.993px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Container25 />
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[16px] relative w-full">
          <Container22 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[140px] items-start relative shrink-0 w-full">
      <Container19 />
      <Container21 />
    </div>
  );
}

function Image7() {
  return (
    <div className="h-[839.992px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
    </div>
  );
}

function Container29() {
  return <div className="bg-[#0a0a0a] h-[840px] shrink-0 w-full" data-name="Container" />;
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col h-[839.992px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image7 />
      <Container29 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col h-[839.992px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container28 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[30.004px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[30px] left-0 text-[#fafafa] text-[20px] top-[1.17px] tracking-[-0.2px]">Think Different</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[31.992px] items-start pl-[259.992px] pr-[459.996px] relative w-full">
        <Container31 />
        <p className="font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] relative shrink-0 text-[#fafafa] text-[40px] tracking-[-1.2px] w-[665px] whitespace-pre-wrap">The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into.</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[71.967px] relative shrink-0 w-[399.999px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[0.53px] w-[399px] whitespace-pre-wrap">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
      </div>
    </div>
  );
}

function Image8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Image8 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[782px] items-start relative shrink-0 w-[600px]" data-name="Container">
      <Paragraph5 />
      <Container34 />
    </div>
  );
}

function Image9() {
  return (
    <div className="h-[781.993px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
    </div>
  );
}

function Container37() {
  return <div className="bg-[#0a0a0a] h-[782px] shrink-0 w-full" data-name="Container" />;
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col h-[781.993px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Image9 />
      <Container37 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[781.993px] items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <Container36 />
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[16px] relative w-full">
          <Container33 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[140px] items-start relative shrink-0 w-full">
      <Container30 />
      <Container32 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-black content-stretch flex flex-col gap-[128px] items-start relative size-full">
      <Frame3 />
      <Frame2 />
      <Container13 />
      <Frame1 />
      <Container27 />
      <Frame4 />
    </div>
  );
}