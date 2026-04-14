import imgImage from "figma:asset/f8cadad5c36cf0a9e65fee88dc37fc6b99d1c9df.png";

function Heading() {
  return (
    <div className="h-[100.012px] relative shrink-0 w-[439.993px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clash_Grotesk_Variable:Light',sans-serif] font-light leading-[50px] left-0 text-[40px] text-white top-[0.9px] tracking-[-1.2px] w-[405px] whitespace-pre-wrap">Define a clear vision for the future</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[202px] relative shrink-0 w-[308px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex items-center justify-center py-px relative shrink-0 w-[418px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Clash_Grotesk_Variable:Regular',sans-serif] font-normal leading-[26px] min-h-px min-w-px relative text-[#79767a] text-[20px] tracking-[-0.2px] whitespace-pre-wrap">{`Whether you’re an R&D team at a Fortune 500 or a founder with a paper napkin sketch, we shape, ideate, prototype, and conceive beloved products for your users.`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[40px] items-center relative">
        <Image />
        <Paragraph />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#131313] content-stretch flex items-center justify-between pb-[54.633px] pt-[78px] px-[23.999px] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#313033] border-b-[0.633px] border-solid inset-0 pointer-events-none" />
      <Heading />
      <Frame />
    </div>
  );
}