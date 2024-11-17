import { Pizza } from "../../dtos/Pizza";
import { Modal, ModalContainer } from "../../components/Modal/styles"

interface ModalPizzaProps {
  pizza: Pizza | null;
  onClose: () => void;
}

export function PizzaUpsertForm({ pizza, onClose }: ModalPizzaProps) {
  return (
    <ModalContainer>
      <Modal>
        <button onClick={onClose}>X</button>
        {pizza ? (
          <>
            <h2>Detalhes da Pizza</h2>
            <p>ID: {pizza._id}</p>
            <p>Sabor: {pizza.sabor}</p>
            <p>Descrição: {pizza.descricao}</p>
            <p>Preço: {pizza.preco}</p>
            <p>Tamanho: {pizza.tamanho}</p>
            <p>Massa: {pizza.massa}</p>
          </>
        ) : (
          <p>Nenhuma pizza selecionada</p>
        )}
      </Modal>
    </ModalContainer>
  );
}

export function PizzaDeleteForm({ pizza, onClose }: ModalPizzaProps) {
  return (
    <ModalContainer>
      <Modal>
        <button onClick={onClose}>X</button>
        {pizza ? (
          <>
            <h2>Detalhes da Pizza</h2>
            <p>ID: {pizza._id}</p>
            <p>Sabor: {pizza.sabor}</p>
            <p>Descrição: {pizza.descricao}</p>
            <p>Preço: {pizza.preco}</p>
            <p>Tamanho: {pizza.tamanho}</p>
            <p>Massa: {pizza.massa}</p>
          </>
        ) : (
          <p>Nenhuma pizza selecionada</p>
        )}
      </Modal>
    </ModalContainer>
  );
}
