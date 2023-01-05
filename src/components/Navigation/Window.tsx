import { Node } from "@react-types/shared";
import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { AriaTabPanelProps, useTab, useTabList, useTabPanel } from "react-aria";
import { TabListProps, TabListState, useTabListState } from "react-stately";

export interface TabNode {
  id: string;
  title: string;
  content: ReactNode;
}

export interface TabProps {
  item: Node<TabNode>;
  state: TabListState<TabNode>;
}

export function Tab({ item, state }: TabProps) {
  const { key, rendered } = item;
  const ref = useRef<HTMLDivElement>(null);
  const { tabProps, isSelected } = useTab({ key }, state, ref);
  return (
    <div
      ref={ref}
      {...tabProps}
      className={clsx(
        "relative flex h-9 w-full max-w-[230px] flex-1 cursor-pointer items-center self-end overflow-hidden whitespace-nowrap rounded-t-[10px] border-b-[2px] pl-3 font-inter text-xs font-medium leading-none text-white outline-none",
        "after:absolute after:right-0 after:flex after:h-full after:w-16 after:bg-gradient-to-r",
        isSelected
          ? "border-neutral-800 bg-neutral-800 after:from-neutral-800/0 after:to-neutral-800/100"
          : "border-black bg-[#14161B] after:from-[#14161B]/0 after:to-[#14161B]/100"
      )}
    >
      {rendered}
    </div>
  );
}

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<TabNode>;
}

export function WindowContent({ state, ...props }: TabPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div
      ref={ref}
      {...tabPanelProps}
      className="relative h-full max-h-full w-full max-w-full overflow-auto bg-neutral-800 text-white outline-none scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-400"
    >
      {state.selectedItem?.props.children}
    </div>
  );
}

const Window = (props: TabListProps<TabNode> & { id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <div
      data-tour={`window-${props.id}`}
      className="flex w-full flex-1 flex-col rounded-md border-[3px] bg-black"
    >
      <div className="flex h-12">
        <div className="mx-4 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ED4245]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FEE75C]"></div>
          <div className="h-3 w-3 rounded-full bg-[#58F287]"></div>
        </div>
        <div
          ref={ref}
          {...tabListProps}
          data-tour={`window-tab-${props.id}`}
          className="flex flex-1 gap-[2px] overflow-auto"
        >
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <WindowContent key={state.selectedItem?.key} state={state} />
    </div>
  );
};

export default Window;
