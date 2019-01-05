import React, { FC, memo, MouseEvent, useRef } from "react";
import styled, { keyframes } from "styled-components/macro";
import logoImage from "../assets/images/logo.png";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { useMappedActions } from "../hooks/useMappedActions";
import { useMappedState } from "redux-react-hook";
import { SearchBar } from "./SearchBar";
import { MarkGithub as GithubIcon } from "styled-icons/octicons";
import {
  Hide as HideIcon,
  Show as ShowIcon
} from "styled-icons/boxicons-regular";
import { useKeyboardPress } from "../hooks/useKeyboardPress";

const mapState = (state: ReduxState) => ({
  query: state.session.query,
  isShowingHiddenBookmark: state.session.isShowingHiddenBookmark
});

const mapActions = {
  setQuery: actions.setQuery,
  toggleShowHiddenBookmark: actions.toggleShowHiddenBookmark
};

export const Header: FC = memo(props => {
  const { isShowingHiddenBookmark, query } = useMappedState(mapState);
  const { toggleShowHiddenBookmark, setQuery } = useMappedActions(mapActions);
  const searchBarRef = useRef<HTMLInputElement>(null);

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
    toggleShowHiddenBookmark();
  };

  return (
    <Root>
      <Logo>
        <LogoImage src={logoImage} />
        <LogoText>Another Tab</LogoText>
      </Logo>
      <SearchBar ref={searchBarRef} query={query} onChange={setQuery} />
      <Menu>
        <MenuItem onClick={handleBookmarksVisibilityClick}>
          {isShowingHiddenBookmark ? <StyledHideIcon /> : <StyledShowIcon />}
          {isShowingHiddenBookmark ? "Hide hidden" : "Show hidden"}
        </MenuItem>
        <Separator />
        <MenuItem
          href="https://github.com/mmazzarolo/chrome-another-tab"
          tabIndex={-1}
        >
          <StyledGithubIcon />
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
  /* background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4); */
  animation: ${fadeInBottom} 0.3s ease-in-out both;
  animation-delay: 0.1s;
`;

const Logo = styled.div`
  display: flex;
  height: 28px;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const LogoText = styled.p`
  color: white;
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const Separator = styled.span`
  background-color: white;
  margin: 0px 16px;
  height: 18px;
  width: 1px;
`;

const StyledHideIcon = styled(HideIcon)`
  color: white;
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

const StyledShowIcon = styled(ShowIcon)`
  color: white;
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

const StyledGithubIcon = styled(GithubIcon)`
  color: white;
  height: 22px;
  width: 22px;
`;
