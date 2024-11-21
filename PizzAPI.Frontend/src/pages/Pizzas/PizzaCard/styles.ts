import styled from 'styled-components';

export const PizzaCardContainer = styled.div`
  background-color: #fff;
  color: #222222;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  justify-content: space-between;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 0;
`

export const PizzaImagem = styled.img`
  width: 100%;
  height: 52dvh;
  object-fit: cover;
`

export const PizzaNome = styled.p`
  margin-top: -5px;
  padding: 4px 8px;
  font-weight: bolder;
  font-size: 1.1rem;
  background-color: red;
  color: #fff;
`

export const PizzaSpan = styled.span`
  font-size: .85rem;
  padding: 4px 8px;
  margin: 0 0 0 8px;
  background-color: #d9d9d9;
  
  border-radius: 12px;
  text-wrap: nowrap;
`

export const PizzaDescricao = styled.p`
  padding: 4px 8px;
`

export const PizzaDisponivel = styled.p`
  background-color: green;
  padding: 4px 8px;
  color: #fff;
  border-radius: 12px;
  font-weight: bolder;
  margin: 0 0 0 4px;
`

export const PizzaIndisponivel = styled.p`
  background-color: red;
  padding: 4px 8px;
  color: #fff;
  border-radius: 12px;
  font-weight: bolder;
  margin: 0 0 0 4px;
`

export const BottomContainer = styled.div`
  background-color: #F2A81F;
  height: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  padding: 4px 8px;
`

export const BotaoPizza = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #222222;
  padding: 5px 8px;
  margin-right: 4px;
  color: #fff;
  border-radius: 20px;
  transition: all .15s;

  &:hover {
    background-color: #fff;
    color: #222222;
  }
`

export const PizzaPreco = styled.p`
  font-weight: bolder;
  font-size: 1.1rem;
  color: #fff;
`