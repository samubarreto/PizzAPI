import { Db, ObjectId } from "mongodb";
import { Pedido } from "../entities/Pedido";
import { IPedidoService } from "../interfaces/IPedidoService";

export class PedidoService implements IPedidoService {
  constructor(private db: Db) { }

  async count(): Promise<number> {
    try {
      return await this.db.collection("pedidos").countDocuments();
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
    const query = search
      ? {
        $or: [
          { cliente: { $regex: search, $options: "i" } },
          { endereco: { $regex: search, $options: "i" } },
          { precoTotal: isNaN(Number(search)) ? null : Number(search) }
        ].filter(condition => condition !== null)
      }
      : {};

    return await this.db.collection("pedidos")
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .toArray() as unknown as Pedido[];
  }

  async insertPedido(pedido: Pedido): Promise<boolean> {
    try {
      pedido.criadoEm = new Date();
      pedido.atualizadoEm = new Date();
      pedido.entregueEm = null;

      const pizzasDoPedido = await this.db.collection("pizzas")
        .find({ _id: { $in: pedido.pizzas.map(pizza => new ObjectId(pizza.pizzaId)) } })
        .toArray();

      const precoTotal = pizzasDoPedido.reduce((total, pizza) => {
        const pizzaPedido = pedido.pizzas.find(p => p.pizzaId === pizza._id.toString());
        if (pizzaPedido) {
          const precoPizza = pizza.preco || 0;
          const quantidade = pizzaPedido.quantidade || 0;
          total += precoPizza * quantidade;
        }
        return total;
      }, 0);

      pedido.precoTotal = precoTotal;

      const result = await this.db.collection("pedidos").insertOne(pedido);
      return result.insertedId != null;
    } catch (error) {
      return false;
    }
  }

  async updatePedido(pedido: Pedido): Promise<boolean> {
    try {
      pedido.atualizadoEm = new Date();
      const { id, ...updatedPedido } = pedido;

      const pizzasDoPedido = await this.db.collection("pizzas")
        .find({ _id: { $in: pedido.pizzas.map(pizza => new ObjectId(pizza.pizzaId)) } })
        .toArray();

      const precoTotal = pizzasDoPedido.reduce((total, pizza) => {
        const pizzaPedido = pedido.pizzas.find(p => p.pizzaId === pizza._id.toString());
        if (pizzaPedido) {
          const precoPizza = pizza.preco || 0;
          const quantidade = pizzaPedido.quantidade || 0;
          total += precoPizza * quantidade;
        }
        return total;
      }, 0);

      updatedPedido.precoTotal = precoTotal;

      const result = await this.db.collection("pedidos").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedPedido }
      );

      return result.matchedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deletePedido(id: string): Promise<boolean> {
    try {
      const result = await this.db.collection("pedidos").deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }
}