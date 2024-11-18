import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  height: 75dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const NotFoundH1 = styled.h1`
  font-size: 3rem;
  color: #222222;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
`

export const NotFoundUrl = styled.p`
  color: var(--cor-cinza-claro);
  font-size: 2rem;
  text-decoration: underline;
`;

export const NotFoundButton = styled.button`
  cursor: pointer;
  color: #fff;
  background-color: #6e6e6e;
  border-radius: 30px;
  border: none;
  padding: 8px 12px;
  transition: all .3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 5px var(--cor-vermelho-transparente);
    transition: all .15s;
  }

  &:active {
    transform: scale(.95);
    transition: all .15s;
  }
`;