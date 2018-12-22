import React, { FC, memo } from "react";
import styled from "styled-components";
import { getFaviconUrl } from "../utils/getFaviconUrl";
import folderImage from "../assets/images/folder-open.svg";

interface Props {
  id: string;
  title: string;
  url?: string;
}

export const BookmarkNode: FC<Props> = memo(props => {
  const { title, url } = props;
  const imageSrc = url ? getFaviconUrl(url) : folderImage;

  return (
    <Root href={url} rel="noopener noreferrer">
      <Content>
        <Image src={imageSrc} />
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
  width: 320px;
  background-color: white;
  background-color: #fbfbfd;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.6s ease-out;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #f5f5fb;
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
`;

const Image = styled.img`
  height: 24px;
  width: 24px;
  min-width: 24px;
  margin-right: 12px;
`;

const Title = styled.span`
  letter-spacing: 0px;
  color: #252124;
`;
