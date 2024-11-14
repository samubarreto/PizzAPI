import { Db, ObjectId } from "mongodb";
import { Pedido } from "../entities/Pedido";
import { IPedidoService } from "../interfaces/IPedidoService";

export class PedidoService implements IPedidoService {
  constructor(private db: Db) { }

  async getPedidoById(id: string): Promise<Pedido | null> {
    try {
      const pedido = await this.db.collection("pedidos").findOne({ _id: new ObjectId(id) });
      return pedido as Pedido | null;
    } catch (error) {
      return null;
    }
  }

  async getPedidos(skip: number, pageSize: number, search: string): Promise<Pedido[]> {
    return [{}] as Pedido[];
    // to do
  }

  async insertPedido(pedido: Pedido): Promise<boolean> {
    return true;
    // to do
  }

  async updatePedido(pedido: Pedido): Promise<boolean> {
    return true;
    // to do
  }

  async deletePedido(id: number): Promise<boolean> {
    return true;
    // to do
  }
}