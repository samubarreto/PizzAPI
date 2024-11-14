import { Request, Response } from 'express';
import { IPedidoService } from '../interfaces/IPedidoService';
import { Pedido } from '../entities/Pedido';

export class PedidoController {
  private pedidoService: IPedidoService;

  constructor(pedidoService: IPedidoService) {
    this.pedidoService = pedidoService
  }

  count = async (req: Request, res: Response) => {
    const countPedidos = await this.pedidoService.count();
    return res.status(200).send(countPedidos.toString());
  };

  getPedidoById = async (req: Request, res: Response) => {
    const pedidoId = req.params["id"];
    try {
      return res.status(200).json(await this.pedidoService.getPedidoById(pedidoId));
    } catch (error) {
      return res.status(500);
    }
  }

  getPedidos = (req: Request, res: Response) => {
    const skip = parseInt(req.params["skip"]) || 0;
    const pageSize = parseInt(req.params["pageSize"]) || 10;
    const search = req.params["search"] || "";
    return res.status(200).json(this.pedidoService.getPedidos(skip, pageSize, search));
  }

  upsertPedido = (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    if (!pedido || pedido == null) {
      return res.status(400);
    }

    if (!pedido.id) {
      const result = this.pedidoService.insertPedido(pedido);
      // if (result)
      return res.status(201);
      // return res.status(422);
    }

    const result = this.pedidoService.updatePedido(pedido);
    // if (result)
    return res.status(200);
    // return res.status(422);
  }

  deletePedido = (req: Request, res: Response) => {
    // const pedidoId = parseInt(req.params["id"]);
    // if (!pedidoId) return res.status(400)
    // if (this.pedidoService.deletePedido(pedidoId)) return res.status(204)
    return res.status(404)
  }
}