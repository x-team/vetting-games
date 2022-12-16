import { useMutation } from "@apollo/client";
import Card from "@components/Surface/Card";
import { gql } from "@gql";
import BasicLayout from "@components/Layout/BasicLayout";
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

const CallbackPage = () => {
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
    <BasicLayout className="items-center justify-center">
      <Card className="w-[400px] gap-10">
        <h1 className="flex justify-center text-center text-xlarge">
          Verifying...
        </h1>
      </Card>
    </BasicLayout>
  );
};

export default CallbackPage;
