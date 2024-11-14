import { Pedido } from "../entities/Pedido";

export interface IPedidoService {
  getPedidoById(id: string): Promise<Pedido | null>;
  getPedidos(skip: number, pageSize: number, search: string): Promise<Pedido[]>;
  insertPedido(pizza: Pedido): Promise<boolean>;
  updatePedido(pizza: Pedido): Promise<boolean>;
  deletePedido(id: number): Promise<boolean>;
}
