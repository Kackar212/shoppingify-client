import { SVGProps } from "react";

interface MinusIconProps extends SVGProps<SVGRectElement> {
  svg?: SVGProps<SVGSVGElement>;
}

export function MinusIcon({
  stroke = "#F9A109",
  strokeLinejoin = "round",
  svg = {},
  ...rectAttrs
}: MinusIconProps) {
  return (
    <svg
      width={14}
      height={2}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...svg}
    >
      <rect
        width={12}
        height={1}
        fill={stroke}
        strokeWidth={0.75}
        strokeLinejoin={strokeLinejoin}
        stroke={stroke}
        x={1}
        y={0.75}
        rx={1}
        ry={1}
        {...rectAttrs}
      />
    </svg>
  );
}
