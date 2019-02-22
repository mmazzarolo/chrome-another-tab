/**
 * Searchbar that resides inside the app header.
 */
import React, { ChangeEvent, forwardRef } from "react";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "styled-icons/material";
import { Theme } from "../types/Theme";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onChange } = props;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Form>
      <StyledSearchIcon />
      <Input
        ref={ref}
        placeholder="Search bookmarks..."
        type="text"
        onChange={handleInputChange}
        value={query}
        autofocus
      />
    </Form>
  );
});

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 190px;
  height: 32px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  width: 28px;
  height: 28px;
  margin-right: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-out;
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  background-color: transparent;
  border: none;
  outline: 0;

  &:hover:focus {
    outline: 0;
    border: none;
  }

  &:focus {
    border: none;
    border-bottom: 1px solid white;
    border-bottom-color: ${(props: { theme: Theme }) =>
      props.theme.headerColor};
  }

  &:hover::placeholder {
  }

  &::placeholder {
    color: ${(props: { theme: Theme }) => props.theme.headerColor};
    opacity: 0.6;
  }
`;
