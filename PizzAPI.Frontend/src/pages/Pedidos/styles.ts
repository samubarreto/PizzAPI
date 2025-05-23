import styled from 'styled-components';

export const PedidosContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px 0;
`;

export const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NovoPedido = styled.button`
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
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  width: 40dvw;
  gap: 4px;
`;

export const FormTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const ConfirmForm = styled.button`
  background-color: #4caf50; /* Verde */
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #a5d6a7; /* Verde claro */
    cursor: not-allowed;
  }
`;

export const CancelForm = styled.button`
  background-color: #f44336; /* Vermelho */
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-left: 12px;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.05);
  }
`;

export const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 12px;
  margin-top: 8px;
`

export const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-wrap: nowrap;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #F2A81F;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  color: #333;
  resize: none;

  &:focus {
    border-color: #F2A81F;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  min-width: 250px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #F2A81F;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const Row = styled.div`
  width: 100%;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-wrap: nowrap;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 4px;
  background-color: #f2f2f2;

  & label {
    padding: 0 0 0 8px;
  }

  & input[type='checkbox'] {
    margin: 0 0 0 8px;
  }

  & input[type='number'],
  & select {
    max-width: 120px;
  }

  & img {
    height: 80px;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    border-radius: 4px;
  }
`

export const SelecaoPizza = styled.div`
  overflow-x: scroll;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  &::-webkit-scrollbar {
  display: block;
}
`

export const PizzaInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px;
  gap: 2px;
  background-color: #222222;
  color: #fff;
  border-radius: 16px;
  width: 175px;
`

export const PizzaImg = styled.img`
  width: 50px;
  object-fit: cover;
  overflow: hidden;
`