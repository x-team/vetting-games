import clsx from "clsx";
import "./digitalClockDigits.css";

interface DigitProps {
  digit: number;
}

const Digit = ({ digit }: DigitProps) => {
  return (
    <span className="h-[60px] w-8 overflow-hidden text-center tracking-tight text-ecru-200 text-xxlarge">
      <div
        className={clsx(
          "digit flex flex-col transition-transform duration-500",
          `digit-${digit}`
        )}
      >
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
    </span>
  );
};

export interface DigitalClockDigitsProps {
  value: number;
  label: string;
}

const DigitalClockDigits = ({ value, label }: DigitalClockDigitsProps) => {
  const firstDigit = Math.floor(value / 10);
  const secondDigit = value % 10;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex justify-center gap-[2.5px]">
        <Digit digit={firstDigit} />
        <Digit digit={secondDigit} />
      </div>
      <span className="text-center">{label}</span>
    </div>
  );
};

export default DigitalClockDigits;
