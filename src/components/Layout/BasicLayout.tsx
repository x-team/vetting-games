import Button from "@components/Input/Button";
import LogoutIcon from "@components/Icon/LogoutIcon";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@components/Navigation/Breadcrumbs";
import { missionSelectionPath } from "@router/paths";
import { useLoaderData } from "react-router-dom";

interface LoaderDataWithBreadcrumbs {
  breadcrumbs?: string[];
}

export interface BasicLayoutProps extends HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
}

const BasicLayout = ({
  children,
  className,
  containerClassName,
  ...props
}: BasicLayoutProps) => {
  const loaderData = useLoaderData() as LoaderDataWithBreadcrumbs | undefined;
  const { breadcrumbs } = loaderData || {};
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div
      {...props}
      className={clsx(
        "bg-stone-200 flex h-screen w-screen flex-col overflow-auto",
        containerClassName
      )}
    >
      <div className="static top-0 flex w-full justify-between">
        <div className="ml-4 flex items-center text-white">
          {breadcrumbs && (
            <Breadcrumbs>
              <BreadcrumbItem href={missionSelectionPath()}>
                Home
              </BreadcrumbItem>
              <BreadcrumbItem>Js Level 1</BreadcrumbItem>
            </Breadcrumbs>
          )}
        </div>
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
