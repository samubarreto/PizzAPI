import { Db, ObjectId } from "mongodb";
import { Pedido } from "../entities/Pedido";
import { ICrudService } from "../interfaces/ICrudService";

export class PedidoService implements ICrudService<Pedido> {
  constructor(private db: Db) { }

  async count(): Promise<number> {
    try {
      return await this.db.collection("pedidos").countDocuments();
    } catch (error) {
      return 0;
    }
  }

  async getById(id: string): Promise<Pedido | null> {
    try {
      const pedido = await this.db.collection("pedidos").findOne({ _id: new ObjectId(id) });
      return pedido as Pedido | null;
    } catch (error) {
      return null;
    }
  }

  async getItems(skip: number, pageSize: number, search: string): Promise<Pedido[]> {
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

  async insert(pedido: Pedido): Promise<boolean> {
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
      const { _id, ...pedidoSemId } = pedido;

      const result = await this.db.collection("pedidos").insertOne(pedidoSemId);
      return result.insertedId != null;
    } catch (error) {
      return false;
    }
  }

  async update(pedido: Pedido): Promise<boolean> {
    try {
      pedido.atualizadoEm = new Date();
      const { _id, ...updatedPedido } = pedido;

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
        { _id: new ObjectId(_id) },
        { $set: updatedPedido }
      );

      return result.matchedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.db.collection("pedidos").deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }
}