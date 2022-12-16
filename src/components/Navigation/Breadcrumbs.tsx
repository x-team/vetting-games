import clsx from "clsx";
import React, { ReactElement, ReactNode, useRef } from "react";
import {
  AriaBreadcrumbItemProps,
  AriaBreadcrumbsProps,
  useBreadcrumbItem,
  useBreadcrumbs,
} from "react-aria";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItemProps extends AriaBreadcrumbItemProps {
  className?: string;
  children: ReactNode;
  href?: string;
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const navigate = useNavigate();
  const { isCurrent, className, href } = props;
  const ref = useRef<HTMLAnchorElement>(null);
  const Component = (isCurrent ? "h3" : "a") as "a";
  const { itemProps } = useBreadcrumbItem(
    {
      ...props,
      elementType: Component,
      onPress: (e) => {
        if (href) navigate(href);
        props?.onPress?.(e);
      },
    },
    ref
  );

  return (
    <li>
      <Component
        {...itemProps}
        ref={ref}
        href={href}
        className={clsx("flex gap-2 uppercase text-xsmall-bold", className)}
        onClick={(e) => {
          e.preventDefault();
          itemProps?.onClick?.(e);
        }}
      >
        {props.children}
        {!props.isCurrent && (
          <span aria-hidden="true" className="text-neutral-400">
            /
          </span>
        )}
      </Component>
    </li>
  );
};

type BreadcrumbChildren = ReactElement<
  BreadcrumbItemProps,
  typeof BreadcrumbItem
>[];

interface BreadcrumbsProps extends AriaBreadcrumbsProps {
  children: BreadcrumbChildren;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { navProps } = useBreadcrumbs(props);
  const children = React.Children.toArray(props.children) as BreadcrumbChildren;

  return (
    <nav {...navProps}>
      <ol className="flex gap-2">
        {children.map((child, i) =>
          React.cloneElement(child, { isCurrent: i === children.length - 1 })
        )}
      </ol>
    </nav>
  );
};
