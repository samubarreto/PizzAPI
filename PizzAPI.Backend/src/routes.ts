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

  router.get('/api/pizza', pizzaController.getPizzas);
  router.get('/api/pizzaCount', pizzaController.count);
  router.get('/api/pizza/:id', pizzaController.getPizzaById);
  router.post('/api/pizza', pizzaController.upsertPizza);
  router.put('/api/pizza', pizzaController.upsertPizza);
  router.delete('/api/pizza/:id', pizzaController.deletePizza);

  const pedidoService = new PedidoService(db);
  const pedidoController = new PedidoController(pedidoService);

  router.get('/api/pedido', pedidoController.getPedidos);
  router.get('/api/pedidoCount', pedidoController.count);
  router.get('/api/pedido/:id', pedidoController.getPedidoById);
  router.post('/api/pedido', pedidoController.upsertPedido);
  router.put('/api/pedido', pedidoController.upsertPedido);
  router.delete('/api/pedido/:id', pedidoController.deletePedido);

  return router;
}