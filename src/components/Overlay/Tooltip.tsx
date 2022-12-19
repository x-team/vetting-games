import emptyFunc from "@utils/emptyFunc";
import { useState } from "react";
import { AriaTooltipProps, mergeProps, useTooltip } from "react-aria";
import { TooltipTriggerState } from "react-stately";

interface TooltipProps extends AriaTooltipProps {
  state: TooltipTriggerState;
  children: React.ReactNode;
}

const TooltipOverlay = ({ state, children, ...props }: TooltipProps) => {
  const { tooltipProps } = useTooltip(props, state);

  return (
    <div
      className="absolute -top-5 mb-[100%] flex w-full -translate-y-full justify-center"
      {...mergeProps(props, tooltipProps)}
    >
      {children}
    </div>
  );
};

const Tooltip = (props: {
  tooltip: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <span
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
      {isHovered && (
        <TooltipOverlay
          state={{
            isOpen: isHovered,
            open: emptyFunc,
            close: emptyFunc,
          }}
        >
          {props.tooltip}
        </TooltipOverlay>
      )}
    </span>
  );
};

export default Tooltip;
