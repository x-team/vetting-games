import { useButton, AriaButtonProps } from "@react-aria/button";
import clsx from "clsx";
import { ElementType, ReactNode, useRef } from "react";

export interface ButtonProps<T extends ElementType> extends AriaButtonProps<T> {
  className?: string;
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  noPadding?: boolean;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
}

function Button(props: ButtonProps<"button">): JSX.Element;
function Button(props: ButtonProps<"a">): JSX.Element;
function Button(props: ButtonProps<"div">): JSX.Element;
function Button(props: ButtonProps<"input">): JSX.Element;
function Button(props: ButtonProps<"span">): JSX.Element;
function Button(props: ButtonProps<ElementType>): JSX.Element;
function Button({
  children,
  elementType,
  className,
  variant = "contained",
  noPadding = false,
  noPaddingX = false,
  noPaddingY = false,
  ...props
}: ButtonProps<ElementType>) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const Component = elementType || "button";

  return (
    <Component
      {...buttonProps}
      className={clsx(
        "flex cursor-pointer select-none items-center justify-center gap-3 border-2 fill-white text-white transition-colors text-small-bold focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-blue-800",
        !(noPadding || noPaddingX) && "px-10",
        !(noPadding || noPaddingY) && "py-5",
        {
          "border-blue-600 bg-blue-600 hover:border-blue-800 hover:bg-blue-800":
            variant === "contained",
          "border-neutral-400 hover:border-neutral-200": variant === "outlined",
          "border-transparent hover:border-b-neutral-200": variant === "text",
        },
        className
      )}
      ref={ref}
    >
      {children}
    </Component>
  );
}

export default Button;
