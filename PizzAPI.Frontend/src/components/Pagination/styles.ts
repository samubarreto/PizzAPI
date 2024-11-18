import styled from 'styled-components';

export const PaginationContainer = styled.div`
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0 0 25px 0;
  padding: 0;
`

export const PaginationButton = styled.button`
  color: #fff;
  font-weight: bolder;
  background-color: rgba(110 ,110, 110, .8);
  padding: 4px 8px;
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
  padding: 4px 8px;
  border-radius: 18px;
`;