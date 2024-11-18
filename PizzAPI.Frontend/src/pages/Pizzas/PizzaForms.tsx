import { Pizza } from "../../dtos/Pizza";
import { FundoPreto } from "../../components/FundoPreto/styles"
import { CancelForm, ConfirmForm, Form, FormTitle } from "./styles";

interface ModalPizzaProps {
  pizza: Partial<Pizza> | null;
  onClose: () => void;
}

export function PizzaUpsertForm({ pizza, onClose }: ModalPizzaProps) {
  return (
    <FundoPreto>
      <Form>
        <FormTitle>{pizza?._id ? "Editar Pizza" : "Inserir Pizza"}</FormTitle>
        <ConfirmForm type="submit">Confirmar</ConfirmForm>
        <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
      </Form>
    </FundoPreto>
  );
}

export function PizzaDeleteForm({ pizza, onClose }: ModalPizzaProps) {
  return (
    <FundoPreto>
      <Form>
        <FormTitle>Excluir Pizza</FormTitle>
        <ConfirmForm type="submit">Confirmar</ConfirmForm>
        <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
      </Form>
    </FundoPreto>
  );
}
