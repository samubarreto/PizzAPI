import { Request, Response } from 'express';
import { IPizzaService } from '../interfaces/IPizzaService';
import { Pizza } from '../entities/Pizza';

export class PizzaController {
  constructor(private pizzaService: IPizzaService) { }

  count = async (req: Request, res: Response) => {
    const countPizzas = await this.pizzaService.count();
    return res.status(200).send(countPizzas.toString());
  };

  getPizzaById = async (req: Request, res: Response) => {
    const pizzaId = req.params["id"];
    try {
      const pizza = await this.pizzaService.getPizzaById(pizzaId);
      if (pizza) {
        return res.status(200).json(pizza);
      }
      return res.sendStatus(404);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  getPizzas = async (req: Request, res: Response) => {
    const skip = parseInt(req.query["skip"] as string) || 0;
    const pageSize = parseInt(req.query["pageSize"] as string) || 10;
    const search = req.query["search"] as string || "";
    try {
      const pizzas = await this.pizzaService.getPizzas(skip, pageSize, search);
      return res.status(200).json(pizzas);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  upsertPizza = async (req: Request, res: Response) => {
    const pizza: Pizza = req.body;
    if (!pizza) {
      return res.sendStatus(400);
    }

    if (!pizza.id) {
      try {
        const result = await this.pizzaService.insertPizza(pizza);
        if (result) {
          return res.sendStatus(201);
        }
        return res.sendStatus(422);
      } catch (error) {
        return res.sendStatus(500);
      }
    } else {
      try {
        const result = await this.pizzaService.updatePizza(pizza);
        if (result) {
          return res.sendStatus(200);
        }
        return res.sendStatus(404);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  }

  deletePizza = async (req: Request, res: Response) => {
    const pizzaId = req.params["id"];
    try {
      const result = await this.pizzaService.deletePizza(pizzaId);
      if (result) {
        return res.sendStatus(204);
      }
      return res.sendStatus(404);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
