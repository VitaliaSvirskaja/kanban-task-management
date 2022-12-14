import { SVGProps } from "react";

export const Add = ({ className, ...svgProps }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className={`h-4 w-4 ${className}`}
    {...svgProps}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
