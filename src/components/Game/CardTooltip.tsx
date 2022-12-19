import clsx from "clsx";

interface CardTooltipProps {
  selected: boolean;
}

const CardTooltip = ({ selected }: CardTooltipProps) => {
  return (
    <div
      className={clsx(
        "relative flex justify-center px-4 py-[6px] uppercase tracking-wide  text-small-bold",
        "after:absolute after:-bottom-2 after:flex after:h-4 after:w-4 after:rotate-45 ",
        selected
          ? "bg-white text-blue-600 after:bg-white"
          : "bg-blue-600 text-white after:bg-blue-600"
      )}
      style={{
        filter: "drop-shadow(0px 0px 16px rgba(82, 62, 182, 0.4))",
      }}
    >
      {selected ? "deselect" : "select"}
    </div>
  );
};

export default CardTooltip;
