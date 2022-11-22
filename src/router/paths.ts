export const timeTrackingPath = () => "/time-tracking";
export const loginPath = () => "/login";
export const callbackPath = () => "/callback";
export const missionSelectionPath = () => "/mission";
export const missionPath = (
  type: unknown = ":type",
  level: unknown = ":level"
) => `/mission/${type}/${level}`;
