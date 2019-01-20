/**
 * Just the SVG logo.
 * Putting it inside a component allows us to easily change its fill color
 * trough props.
 */
import React, { FC } from "react";
import { withTheme } from "styled-components";
import { Theme } from "../types/Theme";

interface Props {
  theme: Theme;
}

export const LogoImage: FC<Props> = withTheme((props: Props) => {
  const { theme, ...otherProps } = props;
  return (
    <svg viewBox="0 0 56 56" xmlSpace="preserve" {...otherProps}>
      <g>
        <path
          d="M0,14.5v39h56v-39H0z M54,51.5H2v-35h52V51.5z"
          fill={theme.headerColor}
        />
        <path
          d="M3,12.5h50c0.552,0,1-0.448,1-1s-0.448-1-1-1H3c-0.552,0-1,0.448-1,1S2.448,12.5,3,12.5z"
          fill={theme.headerColor}
        />
        <path
          d="M6,8.5h44c0.552,0,1-0.448,1-1s-0.448-1-1-1H6c-0.552,0-1,0.448-1,1S5.448,8.5,6,8.5z"
          fill={theme.headerColor}
        />
        <path
          d="M9,4.5h38c0.552,0,1-0.448,1-1s-0.448-1-1-1H9c-0.552,0-1,0.448-1,1S8.448,4.5,9,4.5z"
          fill={theme.headerColor}
        />
      </g>
    </svg>
  );
});
