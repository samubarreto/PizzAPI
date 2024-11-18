import styled from 'styled-components';

export const PizzasContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 25px;
  margin: 0 30px;
`;

export const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NovaPizza = styled.button`
  all: unset;
  color: #fff;
  background-color: rgba(110 ,110, 110, .5);
  padding: 3px 20px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .15s;
  &:hover {
    background-color: #fff;
    color: #222222;
  }
`

export const Form = styled.form`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 15px;
`;

export const FormTitle = styled.p`
  font-size: 1.5rem;
`

export const ConfirmForm = styled.button`
`

export const CancelForm = styled.button`
`