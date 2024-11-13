import { Pizza } from "../entities/Pizza";
import { IPizzaService } from "../interfaces/IPizzaService";
// implementar mongodb

export class PizzaService implements IPizzaService {
  getPizzaById = (id: number): Pizza => {
    return {} as Pizza;
    // to do
  }

  getPizzas = (skip: number, pageSize: number): Pizza[] => {
    return [{}] as Pizza[];
    // to do
  }

  upsertPizza = (id?: number): Pizza => {
    return {} as Pizza;
    // to do
  }

  deletePizza = (id: number): boolean => {
    return true;
    // to do
  }
}