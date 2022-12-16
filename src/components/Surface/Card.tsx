import clsx from "clsx";
import { HTMLAttributes } from "react";

const Card = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col bg-white p-10", className)} {...props}>
    {children}
  </div>
);

export default Card;
