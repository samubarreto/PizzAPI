import { Pedido } from "../dtos/Pedido";
import { API_URL } from "./utils";

export async function getPedidos(skip = 0, pageSize = 10, search = ''): Promise<Pedido[]> {
  const response = await fetch(`${API_URL}/api/pedido?search=${search}&skip=${skip}&pageSize=${pageSize}`);
  const pedidos: Pedido[] = await response.json();
  return pedidos;
}

export async function getPedidoById(idPedido: string) {
  const response = await fetch(`${API_URL}/api/pedido/${idPedido}`);
  const pedido: Pedido = await response.json();
  return pedido;
}

export async function getCountPedidos() {
  const response = await fetch(`${API_URL}/api/pedidoCount/`);
  const data = await response.json();
  const quantidadePedidos: number = data.count;
  return quantidadePedidos;
}

export async function deletarPedido(idPedido: string) {
  let request = {
    method: "DELETE"
  }
  let response = await fetch(`${API_URL}/api/pedido/${idPedido}`, request);
  return response.status;
}

export async function salvarPedido(pedido: Partial<Pedido>) {
  const request = {
    method: pedido._id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  };
  const response = await fetch(`${API_URL}/api/pedido`, request);
  return response.json();
}