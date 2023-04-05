import { SVGProps } from "react";

interface PlusIconProps extends SVGProps<SVGPathElement> {
  svg?: SVGProps<SVGSVGElement>;
}

export function PlusIcon({ svg = {}, ...svgPathProps }: PlusIconProps) {
  const pathProps: SVGProps<SVGPathElement> = {
    stroke: "#c1c1c4",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...svgPathProps,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...svg}
    >
      <path d="M5 12H19" {...pathProps}></path>
      <path d="M12 5L12 19" {...pathProps}></path>
    </svg>
  );
}
