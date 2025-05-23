import { Request, Response } from 'express';
import { Pedido } from '../entities/Pedido';
import { ICrudService } from '../interfaces/ICrudService';

export class PedidoController {
  constructor(private pedidoService: ICrudService<Pedido>) { }

  count = async (req: Request, res: Response) => {
    const countPedidos = await this.pedidoService.count();
    return res.status(200).json({ count: countPedidos });
  };

  getPedidoById = async (req: Request, res: Response) => {
    const pedidoId = req.params["id"];
    try {
      const pedido = await this.pedidoService.getById(pedidoId);
      if (pedido) {
        return res.status(200).json(pedido);
      }
      return res.status(404).send({ message: "not found" });
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }

  getPedidos = async (req: Request, res: Response) => {
    const skip = parseInt(req.query["skip"] as string) || 0;
    const pageSize = parseInt(req.query["pageSize"] as string) || 10;
    const search = req.query["search"] as string || "";
    try {
      const pedidos = await this.pedidoService.getItems(skip, pageSize, search);
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }

  upsertPedido = async (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    if (!pedido) {
      return res.status(400).send({ message: "bad request" });
    }

    if (!pedido._id) {
      try {
        const result = await this.pedidoService.insert(pedido);
        if (result) {
          return res.status(201).send({ message: "created" });
        }
        return res.status(422).send({ message: "unproccessable entity" });
      } catch (error) {
        return res.status(500).send({ message: "internal server error" });
      }
    } else {
      try {
        const result = await this.pedidoService.update(pedido);
        if (result) {
          return res.status(200).send({ message: "ok" });
        }
        return res.status(404).send({ message: "not found" });
      } catch (error) {
        return res.status(500).send({ message: "internal server error" });
      }
    }
  }

  deletePedido = async (req: Request, res: Response) => {
    const pedidoId = req.params["id"];
    try {
      const result = await this.pedidoService.delete(pedidoId);
      if (result) {
        return res.status(204).send({ message: "no content" });
      }
      return res.status(404).send({ message: "not found" });
    } catch (error) {
      return res.status(500).send({ message: "internal server error" });
    }
  }
}