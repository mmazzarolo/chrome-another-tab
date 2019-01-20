/**
 * Screen shown to the user when the are not bookmarks in the list (most of the
 * time it happens if no bookmarks are available in the search result).
 */
import React, { FC } from "react";
import styled, { keyframes } from "styled-components/macro";
import { Theme } from "../types/Theme";

export const NoResult: FC = () => {
  return (
    <Root>
      <Message>No result</Message>
    </Root>
  );
};

const fadeInTop = keyframes`
  from { 
    transform: translateY(20px); 
    opacity: 0;
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
`;

const Message = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.noResultColor};
  font-size: x-large;
  font-weight: 500;
  animation: ${fadeInTop} 0.4s ease-in-out both;
`;
