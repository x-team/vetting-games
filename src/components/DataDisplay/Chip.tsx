import { HTMLAttributes } from "react";

const Chip = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex items-center justify-center gap-3 bg-blue-600 px-1 font-inter text-sm normal-case leading-6 text-white"
    {...props}
  />
);

export default Chip;
