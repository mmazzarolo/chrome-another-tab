import React, { FC, memo, useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import styled from "styled-components/macro";
import { FolderOpen as FolderIcon } from "styled-icons/fa-solid/FolderOpen";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "../selectors/getIsBookmarkHidden";
import { useMappedActions } from "../hooks/useMappedActions";
import { useHover } from "../hooks/useHover";
import { OptionHideShow } from "./OptionHideShow";

interface Props {
  id: string;
  title: string;
  url?: string;
}

const mapActions = {
  hideBookmark: actions.hideBookmark,
  showBookmark: actions.showBookmark
};

export const BookmarkListItem: FC<Props> = memo(props => {
  const { title, url, id } = props;

  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsBookmarkHidden(state, id)
    }),
    [id]
  );
  const { isHidden } = useMappedState(mapState);
  const { hideBookmark, showBookmark } = useMappedActions(mapActions);

  const handleHideClick = () => {
    if (isHidden) {
      showBookmark(id);
    } else {
      hideBookmark(id);
    }
  };

  const faviconSrc = url && getFaviconUrl(url);

  const [rootRef, isHovered] = useHover<HTMLAnchorElement>({ delay: 10 });

  return (
    <Root ref={rootRef} href={url} rel="noopener noreferrer">
      <Content isHidden={isHidden}>
        {url && <Favicon src={faviconSrc} />}
        {!url && <StyledFolderIcon />}
        <Title>{title}</Title>
      </Content>
      {isHovered && (
        <Options>
          <OptionHideShow isHidden={isHidden} onClick={handleHideClick} />
        </Options>
      )}
    </Root>
  );
});

const Root = styled.a`
  display: flex;
  flex-direction: row;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  width: 320px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease-out;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  opacity: ${(props: { isHidden: boolean }) => (props.isHidden ? "0.4" : "1")};
`;

const Favicon = styled.img`
  height: 24px;
  width: 24px;
  min-width: 24px;
  margin-right: 12px;
`;

const StyledFolderIcon = styled(FolderIcon)`
  color: white;
  height: 24px;
  width: 24px;
  margin-right: 12px;
`;

const Title = styled.span`
  letter-spacing: 0px;
  font-weight: 500;
  color: white;

  ${Root}:hover & {
    color: #7076c0;
  }
`;

const Options = styled.div`
  position: absolute;
  margin-top: -8px;
  margin-left: 300px;
`;
