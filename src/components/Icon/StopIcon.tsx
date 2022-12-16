import { HTMLAttributes } from "react";

const StopIcon = (props: HTMLAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 12 13" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0 0.5H12V12.5H0V0.5Z" />
  </svg>
);

export default StopIcon;
