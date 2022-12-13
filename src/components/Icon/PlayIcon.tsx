import { HTMLAttributes } from "react";

const PlayIcon = (props: HTMLAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 11 15" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0 0.5V14.5L11 7.5L0 0.5Z" />
  </svg>
);

export default PlayIcon;
