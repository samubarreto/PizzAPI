import { Pizza } from "../entities/Pizza";
import { IPizzaService } from "../interfaces/IPizzaService";
// implementar mongodb

export class PizzaService implements IPizzaService {
  getPizzaById = (id: number): Pizza => {
    return {} as Pizza;
    // to do
  }

  getPizzas = (skip: number, pageSize: number, search: string): Pizza[] => {
    return [{}] as Pizza[];
    // to do
  }

  insertPizza(pizza: Pizza): boolean {
    return true;
    // to do
  }

  updatePizza(pizza: Pizza): boolean {
    return true;
    // to do
  }

  deletePizza = (id: number): boolean => {
    return true;
    // to do
  }
}