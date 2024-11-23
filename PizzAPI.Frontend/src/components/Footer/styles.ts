import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100dvw;
  background-color: #6e6e6e;
  font-weight: 900;
  text-align: center;
  padding: 8px 0;
  z-index: 50;
`

export const FooterAnchor = styled.a`
  all: unset;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`