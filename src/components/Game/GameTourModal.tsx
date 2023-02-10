import Button from "@components/Input/Button";
import Dialog from "@components/Overlay/Dialog";
import Modal from "@components/Overlay/Modal";
import { OverlayTriggerState } from "react-stately";

interface GameTourModalProps {
  state: OverlayTriggerState;
  onStart?: () => void;
}

const GameTourModal = ({ state, onStart }: GameTourModalProps) => {
  if (!state.isOpen) return null;

  return (
    <Modal state={state}>
      <Dialog className="flex w-[400px] flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-xlarge">Welcome, hunter</h3>
          <p className="text-center text-neutral-400 text-small">
            Your mission is to find what bug is causing problems with this app.
            There might be more than one, so look out. Ready?
          </p>
        </div>
        <Button
          variant="contained"
          className="self-center"
          onPress={() => {
            state.close();
            onStart?.();
          }}
        >
          Let&apos;s go
        </Button>
      </Dialog>
    </Modal>
  );
};

export default GameTourModal;
