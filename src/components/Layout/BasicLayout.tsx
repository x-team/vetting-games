import Button from "@components/Input/Button";
import LogoutIcon from "@components/Icon/LogoutIcon";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

const BasicLayout = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div {...props} className="bg-stone-200 flex h-screen w-screen">
      <div className="absolute top-0 flex w-full justify-between">
        <div className="flex"></div>
        {isAuthenticated() && (
          <Button
            variant="text"
            className="mr-6 px-1"
            onPress={signOut}
            noPaddingX
          >
            Log out
            <LogoutIcon className="h-4" />
          </Button>
        )}
      </div>
      <div className={clsx("flex h-full w-full", className)}>{children}</div>
    </div>
  );
};

export default BasicLayout;
