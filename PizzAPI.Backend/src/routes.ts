import { Router } from "express";
import { PizzaController } from './controllers/PizzaController';
import { PizzaService } from "./services/PizzaService";

export const router = Router();

const pizzaService = new PizzaService();
const pizzaController = new PizzaController(pizzaService);

router.get('/pizza', pizzaController.getPizzas);
router.get('/pizza/:id', pizzaController.getPizzaById);
router.post('/pizza', pizzaController.insertPizza);
router.put('/pizza', pizzaController.updatePizza);
router.delete('/pizza/:id', pizzaController.deletePizza);