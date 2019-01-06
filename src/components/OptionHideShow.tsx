import React, { FC, memo, MouseEvent } from "react";
import styled, { keyframes } from "styled-components/macro";
import { Hide as HideIcon } from "styled-icons/boxicons-regular";
import { Show as ShowIcon } from "styled-icons/boxicons-regular";
import { Theme } from "../types/Theme";

interface Props {
  isHidden: boolean;
  size?: number;
  onClick: () => void;
}

export const OptionHideShow: FC<Props> = memo(props => {
  const { isHidden, size = 32, onClick, ...otherProps } = props;
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <Root onClick={handleClick} size={size} {...otherProps}>
      {!isHidden && <StyledHideIcon size={size * 0.75} />}
      {isHidden && <StyledShowIcon size={size * 0.75} />}
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: { size: number }) => `${props.size}px`};
  height: ${(props: { size: number }) => `${props.size}px`};
  border-radius: ${(props: { size: number }) => `${props.size / 2}px`};
  animation: ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 140ms;
  transition: background-color 100ms;
  background: ${(props: { theme: Theme }) => props.theme.itemOptionBackground};
  &:hover {
    background: ${(props: { theme: Theme }) =>
      props.theme.itemOptionHoverBackground};
  }
`;

const StyledHideIcon = styled(HideIcon)`
  color: ${(props: { theme: Theme }) => props.theme.itemOptionColor};
  ${Root}:hover & {
    color: ${(props: { theme: Theme }) => props.theme.itemOptionHoverColor};
  }
`;

const StyledShowIcon = styled(ShowIcon)`
  color: ${(props: { theme: Theme }) => props.theme.itemOptionColor};
  ${Root}:hover & {
    color: ${(props: { theme: Theme }) => props.theme.itemOptionHoverColor};
  }
`;
