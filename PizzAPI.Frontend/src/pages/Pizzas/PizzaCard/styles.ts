import styled from 'styled-components';

export const PizzaCardContainer = styled.div`
  background-color: #fff;
  color: #222222;
  padding: 5px 0 0 0;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const PizzaImagem = styled.img`
  width: 100%;
  height: 45dvh;
  object-fit: cover;
`

export const PizzaNome = styled.p`
  padding: 4px 8px;
  font-weight: bolder;
  font-size: 1.1rem;
  background-color: red;
  color: #fff;
`

export const PizzaSpan = styled.span`
  padding: 4px 8px;
  margin: 0 0 0 8px;
  background-color: #d9d9d9;
  border-radius: 12px;
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

export const Ingredientes = styled.div`
  display: flex;
  padding: 0 8px;
  gap: 4px;
  flex-direction: row;
  flex: 1;
`

export const Ingrediente = styled.span`
  padding: 4px 8px;
  background-color: #d9d9d9;
  border-radius: 12px;
`

export const PizzaPreco = styled.p`
  margin-top: 8px;
  padding: 4px 8px;
  font-weight: bolder;
  font-size: 1.1rem;
  background-color: #F2A81F;
  text-align: end;
  color: #fff;
`