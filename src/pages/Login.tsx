import Card from "@components/Surface/Card";
import LoginWithGitHubButton from "@components/Input/LoginWithGitHubButton";
import { GITHUB_CLIENT, GITHUB_REDIRECT_URL } from "@constants";
import BasicLayout from "@components/Layout/BasicLayout";

const LoginPage = () => {
  return (
    <BasicLayout className="items-center justify-center">
      <Card className="w-[400px] gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-center text-xlarge">
            Dev hiring
            <br />
            experience
          </h1>
          <p className="text-center tracking-wide text-neutral-800 text-small">
            Welcome to a new way of testing your skills and making the hiring
            process a bit more fun and enjoyable for both of us. Finally. Click
            on your_MISSIONS to discover the test and start the timer when
            you&apos;re ready. No rush.
          </p>
        </div>
        <LoginWithGitHubButton
          clientId={GITHUB_CLIENT}
          redirectUri={GITHUB_REDIRECT_URL}
          scope="read:user user:email"
        />
      </Card>
    </BasicLayout>
  );
};

export default LoginPage;
