import { HTMLAttributes } from "react";
import MonstahAngry from "./MonstahAngry";
import MonstahDisappointed from "./MonstahDisappointed";
import MonstahHappy from "./MonstahHappy";
import MonstahLazy from "./MonstahLazy";
import MonstahNormal from "./MonstahNormal";

export type MonstahMood =
  | "normal"
  | "angry"
  | "lazy"
  | "happy"
  | "disappointed";

const MonstahMoodMap: Record<
  MonstahMood,
  React.FC<HTMLAttributes<SVGSVGElement>>
> = {
  normal: MonstahNormal,
  angry: MonstahAngry,
  lazy: MonstahLazy,
  happy: MonstahHappy,
  disappointed: MonstahDisappointed,
};

interface MonstahProps extends HTMLAttributes<SVGSVGElement> {
  mood: MonstahMood;
}

const Monstah = ({ mood, ...props }: MonstahProps) => {
  const Icon = MonstahMoodMap[mood] || MonstahNormal;
  return <Icon {...props} />;
};

export default Monstah;
