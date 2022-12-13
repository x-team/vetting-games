import clsx from "clsx";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { HTMLAttributes, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

type DialogProps = HTMLAttributes<HTMLDivElement> & AriaDialogProps;

const Dialog = (
  { children, className, ...props }: DialogProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div
      {...props}
      {...dialogProps}
      className={clsx("bg-white p-10 outline-none", className)}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default forwardRef(Dialog);
