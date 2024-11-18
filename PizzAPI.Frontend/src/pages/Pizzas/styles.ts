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
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 40dvw;
  margin: 0 auto;
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
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
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
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;
  margin-left: 12px;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.05);
  }
`;

export const FormInput = styled.input`
  flex: 1;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #ff6347;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  color: #333;
  resize: none;

  &:focus {
    border-color: #ff6347;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #ff6347;
    outline: none;
    box-shadow: 0 0 4px rgba(255, 99, 71, 0.5);
  }
`;

export const FlexRowSpace = styled.div`
  width: 100%;
  gap: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-wrap: nowrap;
`