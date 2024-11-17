import styled from 'styled-components';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* background-color: rgba(110 ,110, 110, .5); */
  padding: 16px 0;
`

export const PaginationButton = styled.button`
  background-color: rgba(110 ,110, 110, .8);
  padding: 5px 8px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all .15s;
  &:hover {
    background-color: #fff;
    color: #222222;
  }
`;

export const PaginationCounter = styled.span`
  background-color: rgba(110 ,110, 110, .5);
  padding: 8px 16px;
  border-radius: 18px;
`;