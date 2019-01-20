/**
 * The folder header, where there are the folder title and its show/hide option.
 */
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

export const FolderHeader: FC<Props> = ({ title, isHidden, onOptionClick }) => {
  const [rootRef, isHovered] = useHover<HTMLParagraphElement>();

  return (
    <Root ref={rootRef}>
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
    </Root>
  );
};

const Root = styled.div`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  margin-left: 10px; /* TODO: react-sortable-hoc grid workaround */
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
