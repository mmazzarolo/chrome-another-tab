import React, { FC, memo, MouseEvent } from "react";
import styled from "styled-components";
import logoImage from "../assets/images/logo.png";

interface Props {
  onEditClick: () => void;
}

export const Header: FC<Props> = memo(props => {
  const handleEditClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    props.onEditClick();
  };
  return (
    <Root>
      <Logo>
        <LogoImage src={logoImage} />
        <LogoText>Another Tab</LogoText>
      </Logo>
      <Link onClick={handleEditClick}>Edit</Link>
    </Root>
  );
});

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px;
  height: 28px;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  display: flex;
  height: 28px;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const LogoText = styled.p`
  font-size: 17px;
  margin-left: 16px;
  color: #252124;
`;

const Link = styled.a`
  font-size: 15px;
  margin-left: 16px;
  color: #252124;
`;
