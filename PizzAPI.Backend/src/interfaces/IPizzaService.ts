import { Pizza } from "../entities/Pizza";

export interface IPizzaService {
  getPizzaById(id: string): Promise<Pizza | null>;
  getPizzas(skip: number, pageSize: number, search: string): Promise<Pizza[]>;
  insertPizza(pizza: Pizza): Promise<boolean>;
  updatePizza(pizza: Pizza): Promise<boolean>;
  deletePizza(id: string): Promise<boolean>;
  count(): Promise<number>;
}
