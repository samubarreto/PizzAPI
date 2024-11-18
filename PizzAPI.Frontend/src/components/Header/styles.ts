import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: static;
  top: 0;
  left: 0;
  width: 100dvw;
  min-height: 75px;
  background-color: #6e6e6e;
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const HeaderAnchor = styled.a`
  all: unset;
  color: #fff;
  font-weight: bolder;
  font-size: 2.5rem;
  &:hover {
    cursor: pointer;
  }
`