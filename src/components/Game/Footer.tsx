import { useMutation } from "@apollo/client";
import Button from "@components/Input/Button";
import {
  finishGameDocument,
  GameLoaderData,
  GamePageParams,
} from "@pages/Game";
import { scoreboardPath } from "@router/paths";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
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
