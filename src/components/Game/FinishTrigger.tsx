import Button from "@components/Input/Button";
import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import ConfirmationModal from "./ConfirmationModal";

interface FinishTriggerProps {
  onConfirm?: () => void;
}

const FinishTrigger = ({ onConfirm }: FinishTriggerProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const modal = useOverlayTriggerState({});
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    modal,
    ref
  );

  return (
    <>
      <Button
        ref={ref}
        variant="contained"
        onPress={modal.open}
        {...triggerProps}
      >
        Finish
      </Button>
      <ConfirmationModal state={modal} onConfirm={onConfirm} />
    </>
  );
};

export default FinishTrigger;
