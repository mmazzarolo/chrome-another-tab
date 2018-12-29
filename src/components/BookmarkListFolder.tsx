import React, { FC, memo } from "react";
import styled from "styled-components/macro";

interface Props {
  title: string;
}

export const BookmarkListFolder: FC<Props> = memo(props => {
  const { title, children } = props;
  return (
    <Root>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Root>
  );
});

const Root = styled.div``;

const Title = styled.li`
  list-style: none;
  padding-left: 0px;
  color: white;
  font-size: 19px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Content = styled.ul`
  display: grid;
  grid-gap: 12px 20px;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-auto-rows: 54px;
  padding-left: 0;
`;
