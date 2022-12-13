import Button from "@components/Input/Button";
import Dialog from "@components/Overlay/Dialog";
import Modal from "@components/Overlay/Modal";
import { OverlayTriggerState } from "react-stately";

interface HelpModalProps {
  state: OverlayTriggerState;
}

const HelpModal = ({ state }: HelpModalProps) => {
  if (!state.isOpen) return null;

  return (
    <Modal state={state}>
      <Dialog className="flex w-[400px] flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-xlarge">Game Instructions</h3>
          <p className="text-neutral-400 text-small">
            Select one or multiple bugs which occur in the code.
          </p>
        </div>
        <Button variant="contained" className="self-end" onPress={state.close}>
          Close
        </Button>
      </Dialog>
    </Modal>
  );
};

export default HelpModal;
