import { useCallback, useEffect, useState } from "react";

export default function useClientRect(element: Element | null) {
  const [clientReact, setClientRect] = useState<DOMRect | null>(null);

  const saveClientRect = useCallback(() => {
    if (!element) return;

    const clientRect = element.getBoundingClientRect();
    setClientRect(clientRect);
  }, [element]);

  useEffect(() => {
    if (!element) return;

    saveClientRect();
    window.addEventListener("resize", saveClientRect);
    return () => window.removeEventListener("resize", saveClientRect);
  }, [saveClientRect]);

  return clientReact;
}
