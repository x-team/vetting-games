import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

interface ModalProps extends AriaModalOverlayProps {
  state: OverlayTriggerState;
  children: React.ReactNode;
}

const Modal = (
  { state, children, ...props }: ModalProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
        {...underlayProps}
      >
        <div {...modalProps} ref={ref}>
          {children}
        </div>
      </div>
    </Overlay>
  );
};

export default forwardRef(Modal);
