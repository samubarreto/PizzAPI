import { TipoMassaPizza } from "./enums/TipoMassaPizza";
import { TipoRecheioBorda } from "./enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "./enums/TipoTamanhoPizza";

export interface Pizza {
  _id?: string,
  sabor: string,
  descricao: string,
  preco: number,
  peso: number,
  recheioBorda?: TipoRecheioBorda,
  tamanho: TipoTamanhoPizza,
  massa: TipoMassaPizza,
  disponivel: boolean,
  atualizadoEm: Date,
  urlImagem: string
}