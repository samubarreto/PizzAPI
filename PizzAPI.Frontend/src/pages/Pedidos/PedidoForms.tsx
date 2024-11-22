import { useState } from "react";
import { FundoPreto } from "../../components/FundoPreto/styles";
import { Pedido } from "../../dtos/Pedido";
import { deletarPedido, salvarPedido } from "../../services/pedidoService";
import { BottomRow, CancelForm, Column, ConfirmForm, Form, FormInput, FormSelect, FormTextarea, FormTitle, MiddleRow, Row } from "./styles";
import { TipoPagamentoPedido } from "../../dtos/enums/TipoPagamentoPedido";
import { TipoStatusPedido } from "../../dtos/enums/TipoStatusPedido";

interface ModalPedidoProps {
  pedido: Partial<Pedido> | null;
  onClose: () => void;
}

export function PedidoUpsertForm({ pedido, onClose }: ModalPedidoProps) {
  const [formState, setFormState] = useState<Partial<Pedido>>(pedido || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedFormState: Partial<Pedido> = {
      ...formState,
      atualizadoEm: new Date(),
    };

    await salvarPedido(normalizedFormState);
    window.location.reload();
  };

  return (
    <FundoPreto>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{formState._id ? "Editar Pedido" : "Novo Pedido"}</FormTitle>

        <Row>
          <label htmlFor="cliente">Cliente:</label>
          <FormInput
            id="cliente"
            type="text"
            name="cliente"
            placeholder="Nome do cliente"
            value={formState.cliente || ""}
            onChange={handleChange}
            required
          />
        </Row>

        <Row>
          <label htmlFor="endereco">Endereço:</label>
          <FormTextarea
            id="endereco"
            name="endereco"
            placeholder="Endereço de entrega"
            value={formState.endereco || ""}
            onChange={handleChange}
            required
          />
        </Row>

        <Row>
          <label htmlFor="metodoPagamento">Método de Pagamento:</label>
          <FormSelect
            id="metodoPagamento"
            name="metodoPagamento"
            value={formState.metodoPagamento || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione</option>
            {Object.values(TipoPagamentoPedido).map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </FormSelect>
        </Row>

        <Row>
          <label htmlFor="status">Status:</label>
          <FormSelect
            id="status"
            name="status"
            value={formState.status || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione</option>
            {Object.values(TipoStatusPedido).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </FormSelect>
        </Row>

        <Row>
          <label htmlFor="observacoes">Observações:</label>
          <FormTextarea
            id="observacoes"
            name="observacoes"
            placeholder="Adicione observações, se necessário"
            value={formState.observacoes || ""}
            onChange={handleChange}
          />
        </Row>

        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Salvar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}


export function PedidoDeleteForm({ pedido, onClose }: ModalPedidoProps) {
  const handleDelete = async () => {
    if (pedido?._id) {
      await deletarPedido(pedido._id);
      window.location.reload();
    }
  };

  return (
    <FundoPreto>
      <Form onSubmit={(e) => { e.preventDefault(); handleDelete(); }} style={{width:'30dvw'}}>
        <FormTitle>Excluir Pedido</FormTitle>
        <MiddleRow>-Tem certeza de que deseja excluir a pedido de {pedido?.cliente}?</MiddleRow>
        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}