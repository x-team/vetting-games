import HelpIcon from "@components/Icon/HelpIcon";
import Button from "@components/Input/Button";
import { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import HelpModal from "./HelpModal";

const HelpTrigger = () => {
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
        variant="outlined"
        onPress={modal.open}
        {...triggerProps}
      >
        Help <HelpIcon className="w-5" />
      </Button>
      <HelpModal state={modal} />
    </>
  );
};

export default HelpTrigger;
