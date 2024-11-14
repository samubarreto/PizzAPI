import { Request, Response } from 'express';
import { IPedidoService } from '../interfaces/IPedidoService';
import { Pedido } from '../entities/Pedido';

export class PedidoController {
  private pedidoService: IPedidoService;

  constructor(pedidoService: IPedidoService) {
    this.pedidoService = pedidoService
  }

  getPedidos = (req: Request, res: Response) => {
    const skip = parseInt(req.params["skip"]) || 0;
    const pageSize = parseInt(req.params["pageSize"]) || 10;
    const search = req.params["search"] || "";
    return res.status(200).json(this.pedidoService.getPedidos(skip, pageSize, search));
  }

  getPedidoById = (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params["id"]);
    if (!pedidoId) return res.status(400)
    return res.status(200).json(this.pedidoService.getPedidoById(pedidoId));
  }

  upsertPedido = (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    if (!pedido || pedido == null) {
      return res.status(400);
    }

    if (!pedido.id) {
      const result = this.pedidoService.insertPedido(pedido);
      if (result)
        return res.status(201);
      return res.status(422);
    }

    const result = this.pedidoService.updatePedido(pedido);
    if (result)
      return res.status(200);
    return res.status(422);
  }

  deletePedido = (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params["id"]);
    if (!pedidoId) return res.status(400)
    if (this.pedidoService.deletePedido(pedidoId)) return res.status(204)
    return res.status(404)
  }
}