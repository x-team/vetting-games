import Button from "@components/Input/Button";
import Dialog from "@components/Overlay/Dialog";
import Modal from "@components/Overlay/Modal";
import { OverlayTriggerState } from "react-stately";

interface ConfirmationModalProps {
  state: OverlayTriggerState;
  onConfirm?: () => void;
}

const ConfirmationModal = ({ state, onConfirm }: ConfirmationModalProps) => {
  if (!state.isOpen) return null;

  return (
    <Modal state={state}>
      <Dialog className="flex w-[400px] flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-xlarge">Finish the game?</h3>
          <p className="text-neutral-400 text-small">
            Once you finish the game, your answers will be submitted.
          </p>
        </div>
        <div className="flex gap-2 self-end">
          <Button
            variant="outlined"
            className="text-neutral-900"
            onPress={state.close}
          >
            Keep playing
          </Button>
          <Button variant="contained" onPress={onConfirm}>
            Finish
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default ConfirmationModal;
