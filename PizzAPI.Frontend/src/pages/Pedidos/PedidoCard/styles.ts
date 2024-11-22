import styled from "styled-components";

export const PedidoCardContainer = styled.div`
  background-color: #fff;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

export const StatusIndicator = styled.div<{ color: string }>`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 8px 0 0 8px;
`;

export const PizzaList = styled.ul`
  margin-top: 8px;
  list-style: none;
  padding: 0;
  font-size: 0.9em;

  li {
    margin-bottom: 4px;
  }
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
      background-color: #0056b3;
    }

    &:nth-child(2) {
      background-color: #dc3545;

      &:hover {
        background-color: #a71d2a;
      }
    }
  }
`;
