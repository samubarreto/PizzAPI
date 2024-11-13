import { Pizza } from "../entities/Pizza";

export interface IPizzaService {
  getPizzaById(id: number): Pizza | null;
  getPizzas(skip: number, pageSize: number, search: string): Pizza[];
  insertPizza(pizza: Pizza): boolean;
  updatePizza(pizza: Pizza): boolean;
  deletePizza(id: number): boolean;
}
