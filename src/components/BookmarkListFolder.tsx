import React, { FC, memo, useCallback } from "react";
import styled from "styled-components/macro";
import { useHover } from "../hooks/useHover";
import { useMappedActions } from "../hooks/useMappedActions";
import { getIsFolderHidden } from "../selectors/getIsFolderHidden";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { useMappedState } from "redux-react-hook";
import { OptionHideShow } from "./OptionHideShow";

interface Props {
  id: string;
  title: string;
}

const mapActions = {
  hideFolder: actions.hideFolder,
  showFolder: actions.showFolder
};

export const BookmarkListFolder: FC<Props> = memo(props => {
  const { id, title, children } = props;

  const mapState = useCallback(
    (state: ReduxState) => ({
      isHidden: getIsFolderHidden(state, id)
    }),
    [id]
  );
  const { isHidden } = useMappedState(mapState);
  const { hideFolder, showFolder } = useMappedActions(mapActions);

  const [rootRef, isHovered] = useHover<HTMLParagraphElement>();

  const handleHideClick = () => {
    if (isHidden) {
      showFolder(id);
    } else {
      hideFolder(id);
    }
  };

  return (
    <Root>
      <Header ref={rootRef}>
        <Title>{title}</Title>
        {isHovered && (
          <Options>
            <OptionHideShow
              size={24}
              isHidden={isHidden}
              onClick={handleHideClick}
            />
          </Options>
        )}
      </Header>
      <Content>{children}</Content>
    </Root>
  );
});

const Root = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

const Title = styled.p`
  color: white;
  font-size: 19px;
  font-weight: 500;
  display: inline-block;
`;

const Content = styled.ul`
  display: grid;
  grid-gap: 12px 20px;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-auto-rows: 54px;
  padding-left: 0;
`;

const Options = styled.div``;
