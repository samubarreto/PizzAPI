import { Request, Response } from 'express';
import { PizzaService } from '../services/PizzaService';

export class PizzaController {
  pizzaService: PizzaService
  constructor(pizzaService = new PizzaService()) {
    this.pizzaService = pizzaService
  }

  getPizzas = (req: Request, res: Response) => {
    return res.status(200).json(this.pizzaService.getPizzas());
  }

  upsertPizza = (req: Request, res: Response) => {
    const pizza = req.body;
    if (!pizza) {
      return res.status(400)
    }

    this.pizzaService.upsertPizza();
    return res.status(201)
  }

  deletePizza = (req: Request, res: Response) => {
    const deletedPizzaId = parseInt(req.params["id"]);

    if (!deletedPizzaId) {
      return res.status(400)
    }

    if (this.pizzaService.deletePizza(deletedPizzaId)) {
      return res.status(204)
    } else {
      return res.status(404)
    }
  }
}