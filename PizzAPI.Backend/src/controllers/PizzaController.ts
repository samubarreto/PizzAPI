import { Request, Response } from 'express';
import { Pizza } from '../entities/Pizza';
import { ICrudService } from '../interfaces/ICrudService';

export class PizzaController {
  constructor(private pizzaService: ICrudService<Pizza>) { }

  count = async (req: Request, res: Response) => {
    const countPizzas = await this.pizzaService.count();
    return res.status(200).json({ count: countPizzas });
  };

  getPizzaById = async (req: Request, res: Response) => {
    const pizzaId = req.params["id"];
    try {
      const pizza = await this.pizzaService.getById(pizzaId);
      if (pizza) {
        return res.status(200).json(pizza);
      }
      return res.status(404).send({ message: "not found" });
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }

  getPizzas = async (req: Request, res: Response) => {
    const skip = parseInt(req.query["skip"] as string) || 0;
    const pageSize = parseInt(req.query["pageSize"] as string) || 10;
    const search = req.query["search"] as string || "";
    try {
      const pizzas = await this.pizzaService.getItems(skip, pageSize, search);
      return res.status(200).json(pizzas);
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }

  upsertPizza = async (req: Request, res: Response) => {
    const pizza: Pizza = req.body;
    if (!pizza) {
      return res.status(400).send({ message: "bad request" });
    }

    if (!pizza._id) {
      try {
        const result = await this.pizzaService.insert(pizza);
        if (result) {
          return res.status(201).send({ message: "created" });
        }
        return res.status(422).send({ message: "unproccessable entity" });
      } catch (error) {
        return res.status(500).send({ message: "internal server error" });
      }
    } else {
      try {
        const result = await this.pizzaService.update(pizza);
        if (result) {
          return res.status(200).send({ message: "ok" });
        }
        return res.status(404).send({ message: "not found" });
      } catch (error) {
        return res.status(500).send({ message: "internal server error" });
      }
    }
  }

  deletePizza = async (req: Request, res: Response) => {
    const pizzaId = req.params["id"];
    try {
      const result = await this.pizzaService.delete(pizzaId);
      if (result) {
        return res.status(204).send({ message: "no content" });
      }
      return res.status(404).send({ message: "not found" });
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }
}
