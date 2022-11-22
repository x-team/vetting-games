import { GITHUB_CLIENT, GITHUB_REDIRECT_URL } from "@constants";
import { FaGithub } from "react-icons/fa";

const loginParams = new URLSearchParams({
  client_id: GITHUB_CLIENT,
  redirect_uri: GITHUB_REDIRECT_URL,
  scope: "read:user user:email",
});

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200">
      <div className="flex w-[400px] flex-col gap-10 bg-white p-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-prompt text-4xl font-extrabold uppercase italic text-gray-800">
            Dev hiring experience
          </h1>
          <p className="tracking-tighter text-gray-600">
            Welcome to a new way of testing your skills and making the hiring
            process a bit more fun and enjoyable for both of us. Finally. Click
            on <span className="font-semibold">your_MISSIONS</span> to discover
            the test and start the timer when you&apos;re ready. No rush.
          </p>
        </div>
        <a
          href={`https://github.com/login/oauth/authorize?${loginParams.toString()}`}
          className="flex h-20 items-center justify-center gap-1 bg-gray-900 py-2 px-6"
        >
          <span className="text-sm font-bold text-white">
            Sign up with Github
          </span>
          <FaGithub color="white" size="24" />
        </a>
      </div>
    </div>
  );
};

export default Login;
