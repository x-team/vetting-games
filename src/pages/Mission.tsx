import { useQuery } from "@apollo/client";
import { gql } from "@gql";
import { missionSelectionPath } from "@router/paths";
import { useSignOut } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";

type MissionParams = {
  type: string;
  level: string;
};

const missionDocument = gql(/* GraphQL */ `
  query missionByTypeLevel($type: String!, $level: Int!) {
    missionByTypeLevel(type: $type, level: $level) {
      id
      title
      type
      level
      description
    }
  }
`);

const Mission = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { type: typeParam, level: levelParam } = useParams<MissionParams>();
  const {
    data: missionData,
    loading,
    error,
  } = useQuery(missionDocument, {
    variables: {
      type: typeParam || "",
      level: levelParam ? parseInt(levelParam, 10) : 0,
    },
    onError: () => {
      navigate(missionSelectionPath());
    },
  });
  const mission = missionData?.missionByTypeLevel;

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center text-3xl font-bold text-gray-900">
      {mission?.title} {mission?.type} level {mission?.level}{" "}
      {mission?.description}
      <button
        className="ml-2 rounded bg-red-500 py-2 px-4 font-bold text-white transition duration-200 hover:bg-red-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Mission;
