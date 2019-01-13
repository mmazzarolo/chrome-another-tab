import React, { FC, memo, useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import styled from "styled-components/macro";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "../selectors/getIsBookmarkHidden";
import { Theme } from "../types/Theme";

interface Props {
  id: string;
  title: string;
  url?: string;
}

export const BookmarkListItem: FC<Props> = memo(props => {
  const { title, url, id } = props;

  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsBookmarkHidden(state, id)
    }),
    [id]
  );
  const { isHidden } = useMappedState(mapState);
  const faviconSrc = url && getFaviconUrl(url);

  return (
    <Root href={url} rel="noopener noreferrer">
      <Content isHidden={isHidden}>
        {url && <Favicon src={faviconSrc} />}
        <Title>{title}</Title>
      </Content>
    </Root>
  );
});

const Root = styled.a`
  display: flex;
  flex-direction: row;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  width: 260px;
  background: ${(props: { theme: Theme }) => props.theme.itemBackground};
  border: ${(props: { theme: Theme }) => props.theme.itemBorder};
  box-shadow: ${(props: { theme: Theme }) => props.theme.itemShadow};
  transition: all 0.2s ease-out;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${(props: { theme: Theme }) => props.theme.itemHoverBackground};
    box-shadow: ${(props: { theme: Theme }) => props.theme.itemHoverShadow};
    outline: none;
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

const Title = styled.span`
  letter-spacing: 0px;
  font-weight: 500;
  color: ${(props: { theme: Theme }) => props.theme.itemTextColor};
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${Root}:hover & {
    color: ${(props: { theme: Theme }) => props.theme.itemHoverTextColor};
  }

  ${Root}:focus & {
    color: ${(props: { theme: Theme }) => props.theme.itemHoverTextColor};
  }
`;
