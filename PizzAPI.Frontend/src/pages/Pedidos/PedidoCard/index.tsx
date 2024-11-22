import { useState } from "react";
import { Pedido } from "../../../dtos/Pedido";
import { PedidoCardContainer, StatusIndicator, CardActions, PizzaList } from "./styles";
import { PedidoDeleteForm, PedidoUpsertForm } from "../PedidoForms";
import { statusColors } from "../../../dtos/enums/TipoStatusPedido";

interface PedidoCardProps {
  pedido: Pedido;
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
  const [pedidoEdit, setPedidoEdit] = useState<Pedido | undefined>(undefined);
  const [pedidoDelete, setPedidoDelete] = useState<Pedido | undefined>(undefined)

  return (
    <>
      {pedidoEdit && <PedidoUpsertForm pedido={pedidoEdit} onClose={() => setPedidoEdit(undefined)} />}
      {pedidoDelete && <PedidoDeleteForm pedido={pedidoDelete} onClose={() => setPedidoDelete(undefined)} />}
      <PedidoCardContainer>
        <StatusIndicator color={statusColors[pedido.status + 1]}/>
        <div>
          <h3>{pedido.cliente}</h3>
          <p><strong>Endereço:</strong> {pedido.endereco}</p>
          <PizzaList>
            <strong>Pizzas:</strong>
            {pedido.pizzas.map((pizza, index) => (
              <li key={index}>Pizza ID: {pizza.pizzaId} | Quantidade: {pizza.quantidade}</li>
            ))}
          </PizzaList>
          <p><strong>Total:</strong> R$ {pedido.precoTotal?.toFixed(2)}</p>
        </div>
        <CardActions>
          <button onClick={() => setPedidoEdit(pedido)}>✏️Editar</button>
          <button onClick={() => setPedidoDelete(pedido)}>🗑️Deletar</button>
        </CardActions>
      </PedidoCardContainer>
    </>
  );
}
