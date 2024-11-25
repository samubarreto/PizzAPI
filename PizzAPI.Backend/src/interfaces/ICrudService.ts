export interface ICrudService<T> {
  getById(id: string): Promise<T | null>;
  getItems(skip: number, pageSize: number, search: string): Promise<T[]>;
  insert(item: T): Promise<boolean>;
  update(item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}