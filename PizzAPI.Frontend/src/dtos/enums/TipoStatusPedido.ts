export enum TipoStatusPedido {
  'Pendente' = 0,
  'Em preparo' = 1,
  'À caminho' = 2,
  'Entregue' = 3
}

export const statusColors: Record<number, string> = {
  1: "#FFC107", // amarelo
  2: "#17A2B8", // azul
  3: "#006e80", // azul escuro
  4: "#28A745", // amarelo
};