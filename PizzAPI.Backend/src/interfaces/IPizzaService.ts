import { Pizza } from "../dtos/Pizza";

export interface IPizzaService {
  getPizzaById(id: number): Pizza;
  getPizzas(skip: number, pageSize: number): Pizza[];
  upsertPizza(id: number): Pizza;
  deletePizza(id: number): boolean;
}
