import React, { FC, memo, MouseEvent } from "react";
import styled, { keyframes } from "styled-components/macro";
import logoImage from "../assets/images/logo.png";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { useMappedActions } from "../hooks/useMappedActions";
import { useMappedState } from "redux-react-hook";

const mapState = (state: ReduxState) => ({
  isShowingHiddenBookmark: state.app.isShowingHiddenBookmark
});

const mapActions = {
  toggleShowHiddenBookmark: actions.toggleShowHiddenBookmark
};

export const Header: FC = memo(props => {
  const { isShowingHiddenBookmark } = useMappedState(mapState);
  const { toggleShowHiddenBookmark } = useMappedActions(mapActions);

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
      <VisibilityLink onClick={handleBookmarksVisibilityClick}>
        {isShowingHiddenBookmark
          ? "Hide hidden bookmarks"
          : "Show hidden bookmarks"}
      </VisibilityLink>
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
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  animation: ${fadeInBottom} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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
  font-size: 17px;
  margin-left: 16px;
  color: #252124;
`;

const VisibilityLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #252124;
  text-decoration: underline;
  cursor: pointer;
`;
