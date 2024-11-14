import { Pedido } from "../entities/Pedido";

export interface IPedidoService {
  getPedidoById(id: number): Pedido | null;
  getPedidos(skip: number, pageSize: number, search: string): Pedido[];
  insertPedido(pizza: Pedido): boolean;
  updatePedido(pizza: Pedido): boolean;
  deletePedido(id: number): boolean;
}
