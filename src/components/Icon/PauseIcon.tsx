import { HTMLAttributes } from "react";

const PauseIcon = (props: HTMLAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0 14.5H4V0.5H0V14.5ZM8 0.5V14.5H12V0.5H8Z" />
  </svg>
);

export default PauseIcon;
