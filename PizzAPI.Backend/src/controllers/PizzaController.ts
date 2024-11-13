import { Request, Response } from 'express';
import { IPizzaService } from '../interfaces/IPizzaService';

export class PizzaController {
  private pizzaService: IPizzaService;

  constructor(pizzaService: IPizzaService) {
    this.pizzaService = pizzaService
  }

  getPizzas = (req: Request, res: Response) => {
    const skip = parseInt(req.params["skip"]) || 0;
    const pageSize = parseInt(req.params["pageSize"]) || 10;
    return res.status(200).json(this.pizzaService.getPizzas(skip, pageSize));
  }

  getPizzaById = (req: Request, res: Response) => {
    const pizzaId = parseInt(req.params["id"]);
    if (!pizzaId) return res.status(400)

    const result = this.pizzaService.getPizzaById(pizzaId);
    if (result == null) return res.status(404);
    return res.status(200).json(result);
  }

  upsertPizza = (req: Request, res: Response) => {
    const pizzaId = parseInt(req.params["id"]) || undefined;
    this.pizzaService.upsertPizza(pizzaId);
    return res.status(201); // ou 200 se for update
  }

  deletePizza = (req: Request, res: Response) => {
    const pizzaId = parseInt(req.params["id"]);
    if (!pizzaId) return res.status(400)
    if (this.pizzaService.deletePizza(pizzaId)) return res.status(204)
    return res.status(404)
  }
}