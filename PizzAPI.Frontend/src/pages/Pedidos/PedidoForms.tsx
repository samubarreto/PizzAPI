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
  const [formState, setFormState] = useState({
    cliente: pedido?.cliente || "",
    endereco: pedido?.endereco || "",
    metodoPagamento: pedido?.metodoPagamento || 0,
    status: pedido?.status || 0,
    observacoes: pedido?.observacoes || "",
    pizzas: pedido?.pizzas || [],
  });
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

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
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handlePizzaChange = (pizzaId: string, quantidade: number) => {
    setFormState((prev) => {
      const updatedPizzas = prev.pizzas.filter((p) => p.pizzaId !== pizzaId);
      if (quantidade > 0) {
        updatedPizzas.push({ pizzaId, quantidade });
      }
      return { ...prev, pizzas: updatedPizzas };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formState,
        status: Number(formState.status),
      };
  
      await salvarPedido(pedido?._id ? { ...payload, _id: pedido._id } : payload);
  
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar o pedido:", error);
    }
  };
  

  return (
    <FundoPreto>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{pedido?._id ? "Editar Pedido" : "Novo Pedido"}</FormTitle>

        <Row>
          <label htmlFor="cliente">Cliente:</label>
          <FormInput
            id="cliente"
            type="text"
            name="cliente"
            placeholder="Nome do cliente"
            value={formState.cliente}
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
            value={formState.endereco}
            onChange={handleChange}
            required
          />
        </Row>

        <Row style={{flexDirection:'row'}}>
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
              ))}
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
              ))}
            </FormSelect>
          </Column>  
        </Row>

        <Row>
          <label htmlFor="observacoes">Observações:</label>
          <FormTextarea
            id="observacoes"
            name="observacoes"
            placeholder="Adicione observações, se necessário"
            value={formState.observacoes}
            onChange={handleChange}
          />
        </Row>

        <Row>
          <label>Pizzas:</label>
          {pizzas.length > 0 && (
            <SelecaoPizza id="pizzas-selecionaveis">
              {pizzas.map((pizza) => (
                <PizzaInput
                  key={pizza._id}
                  pizza={pizza}
                  onQuantityChange={handlePizzaChange}
                />
              ))}
            </SelecaoPizza>
          )}
        </Row>

        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Salvar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}

interface PizzaInputProps {
  pizza: Pizza;
  onQuantityChange: (pizzaId: string, quantidade: number) => void;
}

function PizzaInput({ pizza, onQuantityChange }: PizzaInputProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantidade = parseInt(e.target.value, 10) || 0;
    setQuantity(quantidade);
    onQuantityChange(pizza._id!, quantidade);
  };

  return (
    <PizzaInputContainer>
      <PizzaImg
        src={pizza.urlImagem || PIZZA_PLACEHOLDER}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = PIZZA_PLACEHOLDER;
        }}
      />
      <p>{pizza.sabor} | R$ {pizza.preco ? pizza.preco.toFixed(2) : 0}</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <label style={{ padding:0 }} >Quantidade:</label>
        <FormInput
          id={`pizza-select-${pizza.sabor}`}
          style={{maxWidth: '50px'}}
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
    </PizzaInputContainer>
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