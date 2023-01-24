import { useMutation } from "@apollo/client";
import {
  finishGameDocument,
  GameLoaderData,
  GamePageParams,
} from "@pages/Game";
import { scoreboardPath } from "@router/paths";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import FinishTrigger from "./FinishTrigger";
import HelpTrigger from "./HelpTrigger";
import Timer from "./Timer";

const Footer = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as GameLoaderData;
  const { id } = useParams<keyof GamePageParams>();
  const missionId = data?.game?.mission?.id;
  const gameId = data?.game?.id;

  const [finishGame] = useMutation(finishGameDocument, {
    onCompleted: () =>
      missionId &&
      gameId &&
      navigate(scoreboardPath(missionId.toString(), gameId)),
  });

  const handleFinish = () => {
    id && finishGame({ variables: { id } });
  };

  return (
    <div className="flex justify-end">
      <div data-tour="footer" className="flex flex-col gap-6">
        <Timer />
        <div className="flex gap-2">
          <HelpTrigger />
          <FinishTrigger onConfirm={handleFinish} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
