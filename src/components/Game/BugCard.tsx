import { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import MeetingsAddictIcon from "@components/Icon/BugIcon/MeetingsAddictIcon";
import DailyMeetingsIcon from "@components/Icon/BugIcon/DailyMeetingsIcon";
import BlindDetectiveIcon from "@components/Icon/BugIcon/BlindDetectiveIcon";
import HandlerIcon from "@components/Icon/BugIcon/HandlerIcon";
import CorpoManagerIcon from "@components/Icon/BugIcon/CorpoManagerIcon";
import TaskOverLoadIcon from "@components/Icon/BugIcon/TaskOverLoadIcon";
import ReactMarkdown from "react-markdown";

import "./bugCard.css";

type BugMonster =
  | "Meetings Addict"
  | "Daily Meetings"
  | "Blind Detective"
  | "Handler"
  | "Corpo Manager"
  | "Task Overload";

export const bugMonsterList: BugMonster[] = [
  "Meetings Addict",
  "Daily Meetings",
  "Blind Detective",
  "Handler",
  "Corpo Manager",
  "Task Overload",
];

const bugMonsterIconClassMap: Record<BugMonster, string> = {
  "Meetings Addict": "meetings-addict",
  "Daily Meetings": "daily-meetings",
  "Blind Detective": "blind-detective",
  Handler: "handler",
  "Corpo Manager": "corpo-manager",
  "Task Overload": "task-overload",
};

type BugCardProps = {
  name: string;
  description: string;
  selected?: boolean;
  monster: BugMonster;
};

type IconComponent = FC<HTMLAttributes<SVGSVGElement>>;

const bugMonsterIconMap: Record<BugMonster, IconComponent> = {
  "Meetings Addict": MeetingsAddictIcon,
  "Daily Meetings": DailyMeetingsIcon,
  "Blind Detective": BlindDetectiveIcon,
  Handler: HandlerIcon,
  "Corpo Manager": CorpoManagerIcon,
  "Task Overload": TaskOverLoadIcon,
};

type CardShapeProps = {
  children: React.ReactNode;
  selected?: boolean;
};

const CardShape = ({ children, selected }: CardShapeProps) => {
  return (
    // This container is for the drop shadow
    <div
      className={clsx(
        "card-shadow select-none transition-all",
        selected && "active"
      )}
    >
      {/* 
        This container is for the border in the card.
        Clips the corners and have a padding to it children to simulate a border.
       */}
      <div className="card-clip relative flex h-[390px] w-[240px] p-1 transition-colors">
        {/* This background the se unselected gray version */}
        <div className="card-border absolute inset-0 h-full w-full" />
        {/* It uses opacity to simulate a color transition which is not possible for gradients */}
        <div
          className={clsx(
            "card-border active absolute inset-0 h-full w-full transition-opacity",
            selected ? "opacity-100" : "opacity-0"
          )}
        />
        {/* This container is for the background of the card. It also clips the corners */}
        <div
          className={clsx(
            "card-clip card-bg flex h-full w-full flex-col items-center gap-3 p-3 transition-colors",
            selected && "active"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const BugCard = ({ name, description, selected, monster }: BugCardProps) => {
  const MonsterIcon = bugMonsterIconMap[monster];

  return (
    <CardShape selected={selected}>
      <div className="flex w-full flex-col gap-2">
        <div
          className={clsx(
            "bug-name-clip transition-colors",
            selected ? "bg-[#69CAF8] p-[2px]" : "my-[1px] bg-[#545454] p-[1px]"
          )}
        >
          <div
            className={clsx(
              "bug-name-clip flex justify-center pt-1 text-white transition-colors",
              selected ? "bg-[#23353F]" : "bg-black"
            )}
          >
            <span className="text-center text-medium">{monster}</span>
          </div>
        </div>
        <div
          className={clsx(
            "bug-bg card-clip flex max-h-40 w-full items-center justify-center p-4",
            bugMonsterIconClassMap[monster]
          )}
        >
          <MonsterIcon className="h-full" />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-white text-large">{name}</span>
        <ReactMarkdown className="md-description text-neutral-200 text-small">
          {description}
        </ReactMarkdown>
      </div>
    </CardShape>
  );
};

export default BugCard;
