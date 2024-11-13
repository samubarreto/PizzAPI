import { Pizza } from "../entities/Pizza";

export interface IPizzaService {
  getPizzaById(id: number): Pizza | null;
  getPizzas(skip: number, pageSize: number): Pizza[];
  upsertPizza(id?: number): Pizza;
  deletePizza(id: number): boolean;
}
