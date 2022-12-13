import { useMutation } from "@apollo/client";
import Button from "@components/Input/Button";
import { finishGameDocument, GamePageParams } from "@pages/Game";
import { missionSelectionPath } from "@router/paths";
import { useNavigate, useParams } from "react-router-dom";
import HelpTrigger from "./HelpTrigger";
import Timer from "./Timer";

const Footer = () => {
  const navigate = useNavigate();
  const { id } = useParams<keyof GamePageParams>();

  const [finishGame] = useMutation(finishGameDocument, {
    onCompleted: () => navigate(missionSelectionPath()),
  });

  return (
    <div className="flex justify-end">
      <div className="flex flex-col gap-6">
        <Timer />
        <div className="flex gap-2">
          <HelpTrigger />
          <Button
            variant="contained"
            onPress={() => id && finishGame({ variables: { id } })}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
