import imgImage from "figma:asset/f0ec07ca565c1a95fda88e2cb24343fa120c072c.png";

function Image() {
  return (
    <div className="h-[840px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[90px] relative size-full">
      <Image />
    </div>
  );
}