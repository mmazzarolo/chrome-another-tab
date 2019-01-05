import { ReduxState } from "../types/ReduxState";

export const getCurrentTheme = (state: ReduxState) => {
  const { availableThemes, currentThemeId } = state.themes;
  return availableThemes[currentThemeId];
};
