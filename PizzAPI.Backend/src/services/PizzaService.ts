import { Db, ObjectId } from "mongodb";
import { Pizza } from "../entities/Pizza";
import { ICrudService } from "../interfaces/ICrudService";

export class PizzaService implements ICrudService<Pizza> {
  constructor(private db: Db) { }

  async count(): Promise<number> {
    try {
      return await this.db.collection("pizzas").countDocuments();
    } catch (error) {
      return 0;
    }
  }

  async getById(id: string): Promise<Pizza | null> {
    try {
      const pizza = await this.db.collection("pizzas").findOne({ _id: new ObjectId(id) });
      return pizza as Pizza | null;
    } catch (error) {
      return null;
    }
  }

  async getItems(skip: number, pageSize: number, search: string): Promise<Pizza[]> {
    const query = search
      ? {
        $or: [
          { sabor: { $regex: search, $options: "i" } },
          { descricao: { $regex: search, $options: "i" } },
          { preco: isNaN(Number(search)) ? null : Number(search) }
        ].filter(condition => condition !== null)
      }
      : {};

    return await this.db.collection("pizzas")
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .toArray() as unknown as Pizza[];
  }

  async insert(pizza: Pizza): Promise<boolean> {
    try {
      pizza.criadoEm = new Date();
      pizza.atualizadoEm = new Date();
      const { _id, ...pizzaSemId } = pizza;

      const result = await this.db.collection("pizzas").insertOne(pizzaSemId);
      return result.insertedId != null;
    } catch (error) {
      return false;
    }
  }

  async update(pizza: Pizza): Promise<boolean> {
    try {
      pizza.atualizadoEm = new Date();
      const { _id, ...updatedPizza } = pizza;

      const result = await this.db.collection("pizzas").updateOne(
        { _id: new ObjectId(_id) },
        { $set: updatedPizza }
      );

      return result.matchedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(_id: string): Promise<boolean> {
    try {
      const result = await this.db.collection("pizzas").deleteOne({ _id: new ObjectId(_id) });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }
}
