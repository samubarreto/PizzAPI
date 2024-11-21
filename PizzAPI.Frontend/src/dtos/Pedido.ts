import { TipoPagamentoPedido } from "./enums/TipoPagamentoPedido"
import { TipoStatusPedido } from "./enums/TipoStatusPedido"

export type Pedido = {
  _id?: string,
  pizzas: [
    { pizzaId: string, quantidade: number }
  ],
  precoTotal?: number,
  cliente: string,
  endereco: string,
  metodoPagamento: TipoPagamentoPedido
  status: TipoStatusPedido,
  criadoEm: Date,
  atualizadoEm: Date,
  entregueEm?: Date | null,
  observacoes?: string
}