import React, { FC, memo, ChangeEvent } from "react";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "styled-icons/material";

interface Props {
  query: string;
  onChange: (query: string) => void;
}

export const SearchBar: FC<Props> = memo(props => {
  const { query, onChange } = props;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Form>
      <StyledSearchIcon />
      <Input
        placeholder="Search bookmarks..."
        type="text"
        onChange={handleInputChange}
        value={query}
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
  color: white;
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
  color: white;
  background-color: transparent;
  border: none;
  outline: 0;

  &:hover:focus {
    outline: 0;
    border: none;
  }

  &:hover::placeholder {
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
