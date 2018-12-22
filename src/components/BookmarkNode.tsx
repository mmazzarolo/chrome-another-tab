import React, { FC, memo, MouseEvent, useCallback } from "react";
import styled, { keyframes } from "styled-components/macro";
import { Hide, Show } from "styled-icons/boxicons-regular";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import folderImage from "../assets/images/folder-open.svg";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { useMappedState } from "redux-react-hook";
import { getIsBookmarkHidden } from "../selectors/getIsBookmarkHidden";
import { useMappedActions } from "../hooks/useMappedActions";

interface Props {
  id: string;
  title: string;
  url?: string;
}

const mapActions = {
  hideBookmark: actions.hideBookmark,
  showBookmark: actions.showBookmark
};

export const BookmarkNode: FC<Props> = memo(props => {
  const { title, url, id } = props;

  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsBookmarkHidden(state, id)
    }),
    [id]
  );
  const { isHidden } = useMappedState(mapState);
  const { hideBookmark, showBookmark } = useMappedActions(mapActions);

  const imageSrc = url ? getFaviconUrl(url) : folderImage;

  const handleHideClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isHidden) {
      showBookmark(id);
    } else {
      hideBookmark(id);
    }
  };

  return (
    <Root href={url} isHidden={isHidden} rel="noopener noreferrer">
      <Content>
        <Favicon src={imageSrc} />
        <Title>{title}</Title>
      </Content>
      <Options>
        <Option onClick={handleHideClick}>
          {!isHidden && <HideIcon />}
          {isHidden && <ShowIcon />}
        </Option>
      </Options>
    </Root>
  );
});

const scaleIn = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Root = styled.a`
  display: flex;
  flex-direction: row;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  width: 320px;
  background-color: white;
  background-color: #fbfbfd;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.4s ease-out;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  opacity: ${(props: { isHidden: boolean }) => (props.isHidden ? "0.4" : "1")};

  &:hover {
    background-color: #f5f5fb;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
`;

const Favicon = styled.img`
  height: 24px;
  width: 24px;
  min-width: 24px;
  margin-right: 12px;
`;

const Title = styled.span`
  letter-spacing: 0px;
  color: #252124;
`;

const Options = styled.div`
  position: absolute;
  margin-top: -8px;
  margin-left: 300px;
  width: 40px;
  height: 40px;
  display: none;

  ${Root}:hover & {
    display: block;
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  animation: ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 140ms;
  transition: background-color 100ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const HideIcon = styled(Hide)`
  color: white;
  height: 24px;
  width: 24px;
`;

const ShowIcon = styled(Show)`
  color: white;
  height: 24px;
  width: 24px;
`;
