import { useEffect, useState } from "react";
import { Pedido } from "../../../dtos/Pedido";
import { PedidoCardContainer, StatusIndicator, CardActions, PizzaList } from "./styles";
import { PedidoDeleteForm, PedidoUpsertForm } from "../PedidoForms";
import { statusColors, TipoStatusPedido } from "../../../dtos/enums/TipoStatusPedido";
import { Pizza } from "../../../dtos/Pizza";
import { TipoPagamentoPedido } from "../../../dtos/enums/TipoPagamentoPedido";
import { createCrudService } from "../../../services/crudService";

interface PedidoCardProps {
  pedido: Pedido;
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
  const [pedidoEdit, setPedidoEdit] = useState<Pedido | undefined>(undefined);
  const [pedidoDelete, setPedidoDelete] = useState<Pedido | undefined>(undefined);
  const [pizzasDoPedido, setPizzasDoPedido] = useState<Pizza[]>([] as Pizza[]);
  const pizzaService = createCrudService<Pizza>("pizza");

  useEffect(() => {
    const fetchPizzasDoPedido = async () => {
      const pizzas = await Promise.all(
        pedido.pizzas.map(async (pizza) => {
          const pizzaObj = await pizzaService.getById(pizza.pizzaId);
          return { ...pizzaObj, quantidade: pizza.quantidade };
        })
      );
      setPizzasDoPedido(pizzas);
    };

    fetchPizzasDoPedido();
  }, [pedido]);

  return (
    <>
      {pedidoEdit && <PedidoUpsertForm pedido={pedidoEdit} onClose={() => setPedidoEdit(undefined)} />}
      {pedidoDelete && <PedidoDeleteForm pedido={pedidoDelete} onClose={() => setPedidoDelete(undefined)} />}
      <PedidoCardContainer>
        <StatusIndicator color={statusColors[pedido.status]} />
        <div>
          <h3>Pedido {pedido._id} | STATUS: {TipoStatusPedido[pedido.status]}</h3>
          <p><strong>Endereço:</strong> {pedido.endereco}</p>
          <p><strong>Cliente:</strong> {pedido.cliente}</p>
          {pizzasDoPedido.length > 0 && (
            <PizzaList>
              <strong>Pizzas:</strong>
              {pizzasDoPedido && pizzasDoPedido.map((pizza: Pizza, index: number) => (
                <li key={index}>
                  <strong>Sabor:</strong> {pizza.sabor} | <strong>Preço Unitário:</strong> R$ {pizza.preco!.toFixed(2)} | <strong>Quantidade:</strong> {pizza.quantidade}
                </li>
              ))}
            </PizzaList>
          )}
          <p><strong>Preço total:</strong> R$ {pedido.precoTotal?.toFixed(2)}</p>
          <p><strong>Forma de Pagamento:</strong> {TipoPagamentoPedido[pedido.metodoPagamento]}</p>
          <p><strong>Data do pedido:</strong> {pedido.atualizadoEm.toString()}</p>
          { pedido.observacoes && <p><strong>OBS:</strong> {pedido.observacoes}</p> }
          
        </div>
        <CardActions>
          <button onClick={() => setPedidoEdit(pedido)}>✏️Editar</button>
          <button onClick={() => setPedidoDelete(pedido)}>🗑️Deletar</button>
        </CardActions>
      </PedidoCardContainer>
    </>
  );
}
