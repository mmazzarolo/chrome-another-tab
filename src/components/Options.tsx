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
  isHidden: boolean;
}

export const Options: FC<Props> = memo(props => {
  const { isHidden, children } = props;
  return (
    <Root>
      <Item onClick={() => null}>
        {!isHidden && <StyledHideIcon />}
        {isHidden && <StyledShowIcon />}
      </Item>
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

const Root = styled.div`
  position: absolute;
  margin-top: -8px;
  margin-left: 300px;
  width: 40px;
  height: 40px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
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
  height: 24px;
  width: 24px;
`;

const StyledShowIcon = styled(ShowIcon)`
  color: #7076c0;
  height: 24px;
  width: 24px;
`;
