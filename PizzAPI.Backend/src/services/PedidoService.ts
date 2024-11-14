import { Pedido } from "../entities/Pedido";
import { IPedidoService } from "../interfaces/IPedidoService";
// implementar mongodb

export class PedidoService implements IPedidoService {
  getPedidoById = (id: number): Pedido => {
    return {} as Pedido;
    // to do
  }

  getPedidos = (skip: number, pageSize: number, search: string): Pedido[] => {
    return [{}] as Pedido[];
    // to do
  }

  insertPedido(pedido: Pedido): boolean {
    return true;
    // to do
  }

  updatePedido(pedido: Pedido): boolean {
    return true;
    // to do
  }

  deletePedido = (id: number): boolean => {
    return true;
    // to do
  }
}