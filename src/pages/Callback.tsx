import { useMutation } from "@apollo/client";
import { gql } from "@gql";
import { loginPath, missionSelectionPath } from "@router/paths";
import getJWTPayload from "@utils/getJWTPayload";
import { useSignIn } from "react-auth-kit";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const loginWithGithubDocument = gql(/* GraphQL */ `
  mutation loginWithGitHub($code: String!) {
    loginWithGitHub(code: $code) {
      access_token
    }
  }
`);

const Callback = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [loginWithGithub, { called }] = useMutation(loginWithGithubDocument, {
    onCompleted: (data) => {
      const token = data.loginWithGitHub.access_token;
      const { exp, iat, ...user } = getJWTPayload(token);

      signIn({
        token: data.loginWithGitHub.access_token,
        tokenType: "Bearer",
        expiresIn: exp,
        authState: user,
      });
      navigate(missionSelectionPath());
    },
    onError: () => {
      navigate(loginPath());
    },
  });
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  if (code && !called) {
    loginWithGithub({ variables: { code } });
  }

  if (!code) {
    return <Navigate to={loginPath()} />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200">
      <div className="flex w-[400px] flex-col gap-10 bg-white p-10">
        <h1 className="text-center font-prompt text-4xl font-extrabold uppercase italic text-gray-800">
          Verifying...
        </h1>
      </div>
    </div>
  );
};

export default Callback;
