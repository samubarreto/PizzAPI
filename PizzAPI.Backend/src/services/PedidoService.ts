import { Db, ObjectId } from "mongodb";
import { Pedido } from "../entities/Pedido";
import { IPedidoService } from "../interfaces/IPedidoService";

export class PedidoService implements IPedidoService {
  constructor(private db: Db) { }

  async count(): Promise<number> {
    try {
      const countPedidos = await this.db.collection("pedidos").countDocuments();
      return countPedidos;
    } catch (error) {
      return 0;
    }
  }

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

  async deletePedido(id: string): Promise<boolean> {
    return true;
    // to do
  }
}