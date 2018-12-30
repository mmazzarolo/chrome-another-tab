import React, { FC, memo, MouseEvent, useCallback } from "react";
import styled, { keyframes } from "styled-components/macro";
import { useHover } from "../hooks/useHover";
import { Hide as HideIcon } from "styled-icons/boxicons-regular";
import { Show as ShowIcon } from "styled-icons/boxicons-regular";
import { useMappedActions } from "../hooks/useMappedActions";
import { getIsFolderHidden } from "../selectors/getIsFolderHidden";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { useMappedState } from "redux-react-hook";

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

  const handleHideClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
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
            <Option onClick={handleHideClick}>
              {!isHidden && <StyledHideIcon />}
              {isHidden && <StyledShowIcon />}
            </Option>
          </Options>
        )}
      </Header>
      <Content>{children}</Content>
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

const Options = styled.div`
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
  height: 24px;
  width: 24px;
  border-radius: 16px;
  animation: ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 140ms;
  transition: background-color 100ms;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const StyledHideIcon = styled(HideIcon)`
  color: #7076c0;
  height: 18px;
  width: 18px;
`;

const StyledShowIcon = styled(ShowIcon)`
  color: #7076c0;
  height: 18px;
  width: 18px;
`;
