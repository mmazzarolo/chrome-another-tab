import React, { FC } from "react";
import styled from "styled-components/macro";
import { useHover } from "../hooks/useHover";
import { OptionHideShow } from "./OptionHideShow";
import { Theme } from "../types/Theme";

interface Props {
  title: string;
  isHidden: boolean;
  onOptionClick: () => void;
}

export const BookmarkListFolder: FC<Props> = ({
  title,
  children,
  isHidden,
  onOptionClick
}) => {
  const [rootRef, isHovered] = useHover<HTMLParagraphElement>();

  return (
    <Root>
      <Header ref={rootRef}>
        <Title>{title}</Title>
        {isHovered && (
          <Options>
            <OptionHideShow
              size={24}
              isHidden={isHidden}
              onClick={onOptionClick}
            />
          </Options>
        )}
      </Header>
      {children}
    </Root>
  );
};

const Root = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
`;

const Title = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.folderColor};
  font-size: 19px;
  font-weight: 500;
  display: inline-block;
`;

const Options = styled.div`
  margin-left: 6px;
`;
