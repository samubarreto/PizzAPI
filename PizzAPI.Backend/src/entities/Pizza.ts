import { TipoMassaPizza } from "../enums/TipoMassaPizza"
import { TipoRecheioBorda } from "../enums/TipoRecheioBorda"
import { TipoTamanhoPizza } from "../enums/TipoTamanhoPizza"

export type Pizza = {
  id?: string,
  nome: string,
  descricao: string,
  ingredientes: Array<string>,
  preco: number,
  peso: number,
  recheioBorda?: TipoRecheioBorda,
  tamanho: TipoTamanhoPizza,
  massa: TipoMassaPizza,
  disponivel: boolean,
  criadoEm: Date,
  atualizadoEm: Date,
}