import { useMutation } from "@apollo/client";
import Tooltip from "@components/Overlay/Tooltip";
import {
  GameLoaderData,
  selectBugDocument,
  unselectBugDocument,
} from "@pages/Game";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BugCard, { bugMonsterList } from "./BugCard";
import CardTooltip from "./CardTooltip";

const CARD_HEIGHT = 420;
const CARD_WIDTH = 280;
const CARD_GAP = CARD_WIDTH / 2;
const CARD_PUSH_DISTANCE = 110;
const CARD_ON_HAND_HEIGHT = 160;
const CARDS_ON_HAND = 6;

function calculateCardXPosition(index: number, hoveredIndex: number | null) {
  const shouldPush = hoveredIndex !== null && index !== hoveredIndex;

  return (
    CARD_GAP * index +
    (shouldPush ? CARD_PUSH_DISTANCE : 0) *
      (hoveredIndex && index < hoveredIndex ? -1 : 1)
  );
}

function calculateCardYPosition(index: number, hoveredIndex: number | null) {
  return index === hoveredIndex ? -CARD_HEIGHT : -CARD_ON_HAND_HEIGHT;
}

function calculateCardRotation(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === index) {
    return 0;
  }

  const isLeft = index < CARDS_ON_HAND / 2;

  return index * 2 - 6 + (isLeft ? 2 : 0);
}

type CardPositionProps = {
  children: React.ReactNode;
  index: number;
  hoveredIndex: number | null;
} & React.HTMLAttributes<HTMLDivElement>;

const CardPosition = ({
  children,
  index,
  hoveredIndex,
  ...props
}: CardPositionProps) => {
  const [xPosition, yPosition, rotation] = useMemo(() => {
    return [
      calculateCardXPosition(index, hoveredIndex),
      calculateCardYPosition(index, hoveredIndex),
      calculateCardRotation(index, hoveredIndex),
    ];
  }, [index, hoveredIndex]);

  return (
    <div
      className="absolute cursor-pointer transition-transform"
      style={{
        transform: `translate(${xPosition}px, ${yPosition}px) rotate(${rotation}deg)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const Cards = () => {
  const { data: gameData } = useLoaderData() as GameLoaderData;
  const [selectBug] = useMutation(selectBugDocument);
  const [unselectBug] = useMutation(unselectBugDocument);

  const bugs = gameData?.game?.mission?.bugs;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedBugs, setSelectedBugs] = useState<number[]>([]);

  useEffect(() => {
    if (!gameData?.game?.id) return;

    setSelectedBugs(gameData?.game?.bugs?.map(({ bugId }) => bugId) || []);
  }, [gameData?.game?.bugs]);

  return (
    <div className="absolute bottom-0 left-10 flex gap-2">
      {bugs?.map(({ id, name, description }, index) => (
        <CardPosition
          key={index}
          index={index}
          hoveredIndex={hoveredIndex}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {
            if (!gameData?.game?.id) return;

            if (selectedBugs.includes(id)) {
              unselectBug({
                variables: { gameId: gameData?.game?.id, bugId: id },
              });
              setSelectedBugs(selectedBugs.filter((i) => i !== id));
            } else {
              selectBug({
                variables: { gameId: gameData?.game?.id, bugId: id },
              });
              setSelectedBugs([...selectedBugs, id]);
            }
          }}
        >
          <Tooltip
            tooltip={<CardTooltip selected={selectedBugs.includes(id)} />}
          >
            <BugCard
              name={name}
              description={description}
              selected={selectedBugs.includes(id)}
              monster={bugMonsterList[index]}
            />
          </Tooltip>
        </CardPosition>
      ))}
    </div>
  );
};

export default Cards;
