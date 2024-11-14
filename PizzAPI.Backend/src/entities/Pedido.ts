import { TipoPagamentoPedido } from "../enums/TipoPagamentoPedido"
import { TipoStatusPedido } from "../enums/TipoStatusPedido"
import { Pizza } from "./Pizza"

export type Pedido = {
  id?: string,
  pizzas: [
    { pizzaId: number, quantidade: number }
  ],
  cliente: string,
  endereco: string,
  metodoPagamento: TipoPagamentoPedido
  status: TipoStatusPedido,
  criadoEm: Date,
  atualizadoEm: Date,
  entregueEm: Date,
  observacoes?: string
}