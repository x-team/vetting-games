export const timeTrackingPath = () => "/time-tracking";
export const loginPath = () => "/login";
export const logoutPath = () => "/logout";
export const callbackPath = () => "/callback";
export const missionSelectionPath = () => "/mission";
export const gamePath = (id: string) => `/game/${id}`;
export const scoreboardPath = (missionId: string, gameId: string) =>
  `/scoreboard/${missionId}/${gameId}`;
