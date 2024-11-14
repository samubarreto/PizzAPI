import { Db, ObjectId } from "mongodb";
import { Pizza } from "../entities/Pizza";
import { IPizzaService } from "../interfaces/IPizzaService";

export class PizzaService implements IPizzaService {
  constructor(private db: Db) { }

  async getPizzaById(id: string): Promise<Pizza | null> {
    try {
      const pizza = await this.db.collection("pizzas").findOne({ _id: new ObjectId(id) });
      return pizza as Pizza | null;
    } catch (error) {
      return null;
    }
  }

  async getPizzas(skip: number, pageSize: number, search: string): Promise<Pizza[]> {
    return [{}] as Pizza[];
    // to do
  }

  async insertPizza(pizza: Pizza): Promise<boolean> {
    return true;
    // to do
  }

  async updatePizza(pizza: Pizza): Promise<boolean> {
    return true;
    // to do
  }

  async deletePizza(id: string): Promise<boolean> {
    return true;
    // to do
  }
}