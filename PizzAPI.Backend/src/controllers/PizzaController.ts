import { Request, Response } from 'express';
import { IPizzaService } from '../interfaces/IPizzaService';
import { Pizza } from '../entities/Pizza';

export class PizzaController {
  private pizzaService: IPizzaService;

  constructor(pizzaService: IPizzaService) {
    this.pizzaService = pizzaService
  }

  getPizzas = (req: Request, res: Response) => {
    const skip = parseInt(req.params["skip"]) || 0;
    const pageSize = parseInt(req.params["pageSize"]) || 10;
    const search = req.params["search"] || "";
    return res.status(200).json(this.pizzaService.getPizzas(skip, pageSize, search));
  }

  getPizzaById = (req: Request, res: Response) => {
    const pizzaId = parseInt(req.params["id"]);
    if (!pizzaId) return res.status(400)
    return res.status(200).json(this.pizzaService.getPizzaById(pizzaId));
  }

  upsertPizza = (req: Request, res: Response) => {
    const pizza: Pizza = req.body;
    if (!pizza || pizza == null) {
      return res.status(400);
    }

    if (!pizza.id) {
      const result = this.pizzaService.insertPizza(pizza);
      if (result)
        return res.status(201);
      return res.status(422);
    }

    const result = this.pizzaService.updatePizza(pizza);
    if (result)
      return res.status(200);
    return res.status(422);
  }

  deletePizza = (req: Request, res: Response) => {
    const pizzaId = parseInt(req.params["id"]);
    if (!pizzaId) return res.status(400)
    if (this.pizzaService.deletePizza(pizzaId)) return res.status(204)
    return res.status(404)
  }
}