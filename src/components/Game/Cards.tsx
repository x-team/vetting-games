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

const CARD_ON_HAND_HEIGHT = 160;
const CARD_HEIGHT = 420 - CARD_ON_HAND_HEIGHT;
const CARD_WIDTH = 280;
const CARD_GAP = CARD_WIDTH / 2;
const CARD_PUSH_DISTANCE = 110;
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
  return index === hoveredIndex ? -CARD_HEIGHT : 0;
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

  const bugTypes = gameData?.game?.mission?.bugTypes;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedBugs, setSelectedBugs] = useState<number[]>([]);

  useEffect(() => {
    if (!gameData?.game?.id) return;

    setSelectedBugs(
      gameData?.game?.pickedBugs?.map((bug) => bug.bugTypeId) || []
    );
  }, [gameData?.game?.pickedBugs]);

  return (
    <div
      data-tour="cards"
      className="absolute bottom-0 left-10 flex h-[160px] w-[940px] gap-2"
    >
      {bugTypes?.map(({ id, name, description }, index) => (
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
                variables: { gameId: gameData?.game?.id, bugTypeId: id },
              });
              setSelectedBugs(selectedBugs.filter((i) => i !== id));
            } else {
              selectBug({
                variables: { gameId: gameData?.game?.id, bugTypeId: id },
              });
              setSelectedBugs([...selectedBugs, id]);
            }
          }}
        >
          <Tooltip
            tooltip={<CardTooltip selected={selectedBugs.includes(id)} />}
          >
            <BugCard
              name={`${name} Error`}
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
