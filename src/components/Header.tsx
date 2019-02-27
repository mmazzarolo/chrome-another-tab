/**
 * The app header (with logo, searchbar and a few links).
 */
import React, { FC, memo, MouseEvent, useRef } from "react";
import styled, { keyframes } from "styled-components/macro";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { useMappedActions } from "../hooks/useMappedActions";
import { useMappedState } from "redux-react-hook";
import { SearchBar } from "./SearchBar";
import { LogoImage } from "./LogoImage";
import { MarkGithub as GithubIcon } from "styled-icons/octicons";
import {
  Hide as HideIcon,
  Show as ShowIcon
} from "styled-icons/boxicons-regular";
import {
  ColorLens as ColorLensIcon,
  Settings as SettingsIcon
} from "styled-icons/material";
import { useKeyboardPress } from "../hooks/useKeyboardPress";
import { Theme } from "../types/Theme";

const mapState = (state: ReduxState) => ({
  query: state.session.query,
  isShowingHiddenBookmarks: state.session.isShowingHiddenBookmarks
});

export const Header: FC = memo(props => {
  const { isShowingHiddenBookmarks, query } = useMappedState(mapState);
  const {
    toggleShowHiddenBookmarks,
    setQuery,
    goToNextTheme
  } = useMappedActions(actions);
  const searchBarRef = useRef<HTMLInputElement>(null);

  // Overrides CMD+F default behaviour
  useKeyboardPress({
    key: "f",
    metaKey: true,
    onKeyDown: e => {
      e.preventDefault();
      searchBarRef.current && searchBarRef.current.focus();
    }
  });

  const handleBookmarksVisibilityClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleShowHiddenBookmarks();
  };

  const handleThemeSwitchClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToNextTheme();
  };

  return (
    <Root>
      <Logo>
        <StyledLogoImage />
        <LogoText>Another Tab</LogoText>
      </Logo>
      <SearchBar ref={searchBarRef} query={query} onChange={setQuery} />
      <Menu>
        <MenuItem onClick={handleBookmarksVisibilityClick}>
          {isShowingHiddenBookmarks ? <StyledHideIcon /> : <StyledShowIcon />}
          <ToolTip>
            {isShowingHiddenBookmarks
              ? "Hide hidden bookmarks"
              : "Show hidden bookmarks"}
          </ToolTip>
        </MenuItem>
        <Separator />
        <MenuItem onClick={handleThemeSwitchClick}>
          <StyledColorLensIcon />
          <ToolTip>Change theme colors</ToolTip>
        </MenuItem>
        <Separator />
        <MenuItem
          href="https://github.com/mmazzarolo/chrome-another-tab"
          tabIndex={-1}
        >
          <StyledGithubIcon />
        </MenuItem>
        <Separator />
        <MenuItem>
          <StyledSettingsIcon />
          <ToolTip>Settings</ToolTip>
        </MenuItem>
      </Menu>
    </Root>
  );
});

const fadeInBottom = keyframes`
  from { 
    transform: translateY(-40px); 
    opacity: 0;
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px;
  height: 28px;
  background: ${(props: { theme: Theme }) => props.theme.headerBackground};
  animation: ${fadeInBottom} 0.1s ease-in-out both;
  animation-delay: 0.1s;
`;

const Logo = styled.div`
  display: flex;
  height: 28px;
  flex-direction: row;
  align-items: center;
`;

const StyledLogoImage = styled(LogoImage)`
  width: 28px;
  height: 28px;
`;

const LogoText = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToolTip = styled.span`
  visibility: hidden;
  width: 120px;
  text-align: center;
  border-radius: 8px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  color: white;
  background-color: black;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

const MenuItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;

    ${ToolTip} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Separator = styled.span`
  background: ${(props: { theme: Theme }) => props.theme.headerColor};
  margin: 0px 16px;
  height: 18px;
  width: 1px;
`;

const StyledHideIcon = styled(HideIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

const StyledColorLensIcon = styled(ColorLensIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

const StyledShowIcon = styled(ShowIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

const StyledGithubIcon = styled(GithubIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
`;
