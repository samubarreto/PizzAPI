import { Pizza } from "../dtos/Pizza";
import { API_URL } from "./utils";

export async function getPizzas(skip = 0, pageSize = 10, search = ''): Promise<Pizza[]> {
  const response = await fetch(`${API_URL}/api/pizza?search=${search}&skip=${skip}&pageSize=${pageSize}`);
  const pizzas: Pizza[] = await response.json();
  return pizzas;
}

export async function getPizzaById(idPizza: string) {
  const response = await fetch(`${API_URL}/api/pizza/${idPizza}`);
  const pizza: Pizza = await response.json();
  return pizza;
}

export async function getCountPizzas() {
  const response = await fetch(`${API_URL}/api/pizzaCount/`);
  const data = await response.json();
  const quantidadePizzas: number = data.count;
  return quantidadePizzas;
}

export async function deletarPizza(idPizza: string) {
  let request = {
    method: "DELETE"
  }
  let response = await fetch(`${API_URL}/api/pizza/${idPizza}`, request);
  return response.status;
}

export async function salvarPizza(pizza: Partial<Pizza>) {
  const request = {
    method: pizza._id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  };
  const response = await fetch(`${API_URL}/api/pizza`, request);
  return response.json();
}