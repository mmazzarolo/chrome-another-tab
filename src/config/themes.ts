import { Theme } from "./../types/Theme";
import themeDeepBlue from "../assets/themes/deep-blue.json";
import themeSky from "../assets/themes/sky.json";

export const themes: { [id: string]: Theme } = {
  deepBlue: themeDeepBlue,
  sky: themeSky
};
