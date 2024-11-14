import { Router } from "express";
import { PizzaController } from './controllers/PizzaController';
import { PizzaService } from "./services/PizzaService";
import { Db } from "mongodb";
import { PedidoService } from "./services/PedidoService";
import { PedidoController } from "./controllers/PedidoController";

export function createRoutes(db: Db) {
  const router = Router();

  const pizzaService = new PizzaService(db);
  const pizzaController = new PizzaController(pizzaService);

  router.get('/pizza', pizzaController.getPizzas);
  router.get('/pizza/:id', pizzaController.getPizzaById);
  router.post('/pizza', pizzaController.upsertPizza);
  router.put('/pizza', pizzaController.upsertPizza);
  router.delete('/pizza/:id', pizzaController.deletePizza);

  const pedidoService = new PedidoService(db);
  const pedidoController = new PedidoController(pedidoService);

  router.get('/pedido', pedidoController.getPedidos);
  router.get('/pedido/:id', pedidoController.getPedidoById);
  router.post('/pedido', pedidoController.upsertPedido);
  router.put('/pedido', pedidoController.upsertPedido);
  router.delete('/pedido/:id', pedidoController.deletePedido);

  return router;
}