/**
 * A single bookmark item of the bookmark grid.
 * Wrapped in SortableElement from react-sortable-hoc to make it sortable (in
 * the grid).
 * Since SortableElement doesn't work well with some CSS properties,
 * (specifically, hover and transition), we toggle them if the user is dragging
 * an item across the grid.
 */
import React from "react";
import styled from "styled-components/macro";
import { SortableElement } from "react-sortable-hoc";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import { Theme } from "../types/Theme";

interface Props {
  id: string;
  title: string;
  url?: string;
  isHidden: boolean;
  isHoverDisabled?: boolean;
  isTransitionDisabled?: boolean;
}

export const BookmarkGridItem = SortableElement<Props>(
  ({ title, url, isHidden, isHoverDisabled, isTransitionDisabled }: Props) => {
    const faviconSrc = url && getFaviconUrl(url);

    return (
      <Root
        draggable={false} // Disables the browser built-in drag handler
        href={url}
        rel="noopener noreferrer"
        isHoverDisabled={isHoverDisabled}
        isTransitionDisabled={isTransitionDisabled}
      >
        <Content isHidden={isHidden}>
          {url && <Favicon src={faviconSrc} />}
          <Title>{title}</Title>
        </Content>
      </Root>
    );
  }
);

interface RootProps {
  theme: Theme;
  isHoverDisabled?: boolean;
  isTransitionDisabled?: boolean;
}
const Root = styled.a`
  display: flex;
  flex-direction: row;
  text-align: left;
  margin: 6px 10px; /* TODO: react-sortable-hoc grid workaround */
  height: 54px; /* TODO: react-sortable-hoc grid workaround */
  font-size: 14px;
  font-weight: 400;
  width: 260px;
  background: ${(props: RootProps) => props.theme.itemBackground};
  border: ${(props: RootProps) => props.theme.itemBorder};
  box-shadow: ${(props: RootProps) => props.theme.itemShadow};
  border-radius: 4px;
  cursor: ${(props: RootProps) =>
    props.isHoverDisabled ? "initial" : "pointer"};
  text-decoration: none;
  box-sizing: border-box;
  /* 
  We need to set transition to "initial" here while dragging elements, otherwise
  the built-in react-sortable-hoc transition won't work: 
  See: https://github.com/clauderic/react-sortable-hoc/issues/334 
  */
  transition: ${(props: RootProps) =>
    props.isTransitionDisabled
      ? "initial"
      : "background 0.2s ease-out, box-shadow 0.2s ease-out"};

  &:hover,
  &:focus {
    background: ${(props: RootProps) =>
      props.isHoverDisabled
        ? props.theme.itemBackground
        : props.theme.itemHoverBackground};
    box-shadow: ${(props: RootProps) =>
      props.isHoverDisabled
        ? props.theme.itemShadow
        : props.theme.itemHoverShadow};
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
  user-select: none;
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
