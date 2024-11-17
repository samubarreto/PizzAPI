import styled from "styled-components";

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const SearchBarInput = styled.input`
  all: unset;
  width: 50%;
  background-color: #fff;
  text-align: center;
  padding: 8px 12px;
  color: #222222;
  border-radius: 18px;
  cursor: text;
  transition: all .15s;
  font-size: 1.2rem;
  &:hover {
    background-color: #fff;
    color: #222222;
  };
`