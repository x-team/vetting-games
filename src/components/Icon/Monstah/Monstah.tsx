import { HTMLAttributes } from "react";
import MonstahAngry from "./MonstahAngry";
import MonstahLazy from "./MonstahLazy";
import MonstahNormal from "./MonstahNormal";

const MonstahMoodMap: Record<
  string,
  React.FC<HTMLAttributes<SVGSVGElement>>
> = {
  normal: MonstahNormal,
  angry: MonstahAngry,
  lazy: MonstahLazy,
};

interface MonstahProps extends HTMLAttributes<SVGSVGElement> {
  mood: string;
}

const Monstah = ({ mood, ...props }: MonstahProps) => {
  const Icon = MonstahMoodMap[mood] || MonstahNormal;
  return <Icon {...props} />;
};

export default Monstah;
