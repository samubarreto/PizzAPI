import { Request, Response } from 'express';
import { IPedidoService } from '../interfaces/IPedidoService';
import { Pedido } from '../entities/Pedido';

export class PedidoController {
  constructor(private pedidoService: IPedidoService) { }

  count = async (req: Request, res: Response) => {
    const countPedidos = await this.pedidoService.count();
    return res.status(200).send(countPedidos.toString());
  };

  getPedidoById = async (req: Request, res: Response) => {
    const pedidoId = req.params["id"];
    try {
      const pedido = await this.pedidoService.getPedidoById(pedidoId);
      if (pedido) {
        return res.status(200).json(pedido);
      }
      return res.sendStatus(404);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  getPedidos = async (req: Request, res: Response) => {
    const skip = parseInt(req.query["skip"] as string) || 0;
    const pageSize = parseInt(req.query["pageSize"] as string) || 10;
    const search = req.query["search"] as string || "";
    try {
      const pedidos = await this.pedidoService.getPedidos(skip, pageSize, search);
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  upsertPedido = async (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    if (!pedido) {
      return res.sendStatus(400);
    }

    if (!pedido._id) {
      try {
        const result = await this.pedidoService.insertPedido(pedido);
        if (result) {
          return res.sendStatus(201);
        }
        return res.sendStatus(422);
      } catch (error) {
        return res.sendStatus(500);
      }
    } else {
      try {
        const result = await this.pedidoService.updatePedido(pedido);
        if (result) {
          return res.sendStatus(200);
        }
        return res.sendStatus(404);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  }

  deletePedido = async (req: Request, res: Response) => {
    const pedidoId = req.params["id"];
    try {
      const result = await this.pedidoService.deletePedido(pedidoId);
      if (result) {
        return res.sendStatus(204);
      }
      return res.sendStatus(404);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}