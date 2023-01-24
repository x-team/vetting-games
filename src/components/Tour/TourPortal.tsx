import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

export interface TourPortalProps {
  children: React.ReactNode;
}

const TourPortal = ({ children }: TourPortalProps) => {
  const id = useId();
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portal = document.createElement("div");
    portal.setAttribute("id", "tour-portal-" + id);
    setPortalElement(portal);

    document.body.appendChild(portal);

    return () => {
      document.body.removeChild(portal);
    };
  }, []);

  if (!portalElement || !children) return null;

  return createPortal(children, portalElement);
};

export default TourPortal;
