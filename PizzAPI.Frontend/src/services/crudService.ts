import { API_URL } from "./utils";

interface CrudService<T> {
  getItems(skip?: number, pageSize?: number, search?: string): Promise<T[]>;
  getById(id: string): Promise<T>;
  count(): Promise<number>;
  save(item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export function createCrudService<T>(endpoint: string): CrudService<T> {
  return {
    async getItems(skip = 0, pageSize = 10, search = ''): Promise<T[]> {
      const response = await fetch(`${API_URL}/api/${endpoint}?search=${search}&skip=${skip}&pageSize=${pageSize}`);
      return response.json();
    },
    async getById(id: string): Promise<T> {
      const response = await fetch(`${API_URL}/api/${endpoint}/${id}`);
      return response.json();
    },
    async count(): Promise<number> {
      const response = await fetch(`${API_URL}/api/${endpoint}Count/`);
      const data = await response.json();
      return data.count;
    },
    async save(item: Partial<T>): Promise<T> {
      const method = (item as any)._id ? "PUT" : "POST";
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return response.json();
    },
    async delete(id: string): Promise<boolean> {
      const response = await fetch(`${API_URL}/api/${endpoint}/${id}`, { method: "DELETE" });
      return response.ok;
    },
  };
}
