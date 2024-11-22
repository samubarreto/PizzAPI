import { Pedido } from "../../../dtos/Pedido"
import { PedidoCardContainer } from "./styles"

interface PedidoCardProps {
  pedido: Pedido
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
  return (
    <>
      <PedidoCardContainer>
        fazer
      </PedidoCardContainer>
    </>
  )
}