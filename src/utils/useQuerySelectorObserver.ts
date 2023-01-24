import { useEffect } from "react";

export default function useQuerySelectorObserver(
  querySelector?: string,
  callback?: (element: Element | null) => void
) {
  useEffect(() => {
    if (!querySelector) return callback?.(null);

    const target = document.querySelector(querySelector);

    if (target) {
      return callback?.(target);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const target = document.querySelector(querySelector);
          if (target) {
            callback?.(target);
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [querySelector, callback]);
}
