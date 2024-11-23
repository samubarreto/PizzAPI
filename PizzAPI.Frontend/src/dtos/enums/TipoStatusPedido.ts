export enum TipoStatusPedido {
  'Pendente' = 0,
  'Em preparo' = 1,
  'À caminho' = 2,
  'Entregue' = 3
}

export const statusColors: Record<number, string> = {
  0: "#FFC107", // amarelo
  1: "#17A2B8", // azul
  2: "#0339fc", // azul escuro
  3: "#28A745", // amarelo
};