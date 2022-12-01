import GitHubIcon from "@components/Icon/GitHubIcon";
import clsx from "clsx";
import { useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import Button from "./Button";

export interface LoginWithGitHubButtonProps {
  className?: string;
  clientId: string;
  redirectUri: string;
  scope: string;
}

const LoginWithGitHubButton = ({
  className,
  clientId,
  redirectUri,
  scope,
}: LoginWithGitHubButtonProps) => {
  const loginParams = useMemo(
    () =>
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
      }).toString(),
    [clientId, redirectUri, scope]
  );
  const url = useMemo(
    () => `https://github.com/login/oauth/authorize?${loginParams}`,
    [loginParams]
  );

  return (
    <Button
      variant="contained"
      className={clsx("uppercase", className)}
      onPress={() => {
        window.location.href = url;
      }}
    >
      Sign up with Github
      <GitHubIcon className="w-6" />
    </Button>
  );
};

export default LoginWithGitHubButton;
