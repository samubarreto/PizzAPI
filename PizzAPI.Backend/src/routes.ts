import { Router } from "express";
import { PizzaController } from './controllers/PizzaController';

export const router = Router();
const pizzaController = new PizzaController();

router.get('/pizza', pizzaController.getPizzas)
router.post('/pizza', pizzaController.upsertPizza)
router.delete('/pizza/:id', pizzaController.deletePizza)