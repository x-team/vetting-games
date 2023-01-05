import { useCallback, useState } from "react";

export default function useControlledState<S>(
  state: S | undefined,
  defaultState: S | (() => S),
  onChange?: (state: S) => void
): [S, (state: S) => void] {
  const [innerState, setInnerState] = useState<S>(defaultState);

  const setState = useCallback(
    (state: S) => {
      setInnerState(state);
      onChange?.(state);
    },
    [onChange]
  );

  return [state !== undefined ? state : innerState, setState];
}
