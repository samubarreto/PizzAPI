import { useEffect, useState } from "react";
import { FundoPreto } from "../../components/FundoPreto/styles";
import { Pedido } from "../../dtos/Pedido";
import { deletarPedido, salvarPedido } from "../../services/pedidoService";
import { BottomRow, CancelForm, Column, ConfirmForm, Form, FormInput, FormSelect, FormTextarea, FormTitle, MiddleRow, PizzaImg, PizzaInputContainer, Row, SelecaoPizza } from "./styles";
import { TipoPagamentoPedido } from "../../dtos/enums/TipoPagamentoPedido";
import { TipoStatusPedido } from "../../dtos/enums/TipoStatusPedido";
import { Pizza } from "../../dtos/Pizza";
import { getPizzas } from "../../services/pizzaService";
import { PIZZA_PLACEHOLDER } from "../../services/utils";

interface ModalPedidoProps {
  pedido: Partial<Pedido> | null;
  onClose: () => void;
}

export function PedidoUpsertForm({ pedido, onClose }: ModalPedidoProps) {
  const [formState, setFormState] = useState<Partial<Pedido>>(pedido || {});
  const [pizzas, setPizzas] = useState<Pizza[] | undefined>(undefined);

  const fetchPizzas = async () => {
    try {
      const res = await getPizzas(0, 100000, "");
      setPizzas(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchPizzas();
  }, []);

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

        <Row style={{flexDirection:"row"}}>
          <Column>
            <label htmlFor="metodoPagamento">Método de Pagamento:</label>
            <FormSelect
              id="metodoPagamento"
              name="metodoPagamento"
              value={formState.metodoPagamento || 0}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione</option>
              {Object.entries(TipoPagamentoPedido)
                .filter(([value]) => isNaN(Number(value)))
                .map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))
              }
            </FormSelect>
          </Column>
            
          <Column>
            <label htmlFor="status">Status:</label>
            <FormSelect
              id="status"
              name="status"
              value={formState.status || 0}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione</option>
              {Object.entries(TipoStatusPedido)
                .filter(([value]) => isNaN(Number(value)))
                .map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))
              }
            </FormSelect>
          </Column>
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

        <Row>
          <label htmlFor="pizzas">Pizzas:</label>
          { pizzas && <SelecaoPizza>{ pizzas?.map((pizza) => (<PizzaInput key={pizza._id} pizza={pizza} />)) }</SelecaoPizza> }
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
        <MiddleRow>-Tem certeza de que deseja excluir o pedido de {pedido?.cliente}?</MiddleRow>
        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}

interface PizzaInputProps {
  pizza: Pizza;
}

function PizzaInput({ pizza }: PizzaInputProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };

  return (
    <PizzaInputContainer>
      <PizzaImg
        src={pizza.urlImagem || PIZZA_PLACEHOLDER}
        onError={(e) => { const target = e.target as HTMLImageElement; target.src = PIZZA_PLACEHOLDER }}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <p>Sabor: {pizza.sabor}</p>
      <p>Preço: R$ {pizza.preco.toFixed(2)}</p>
      <div>
        <label>Qtd:</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          style={{ width: "70px", textAlign: "center", marginTop: "5px" }}
          placeholder="Qtd"
          />
      </div>
    </PizzaInputContainer>
  );
}