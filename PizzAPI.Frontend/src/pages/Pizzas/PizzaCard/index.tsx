import { TipoMassaPizza } from "../../../dtos/enums/TipoMassaPizza";
import { TipoRecheioBorda } from "../../../dtos/enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "../../../dtos/enums/TipoTamanhoPizza";
import { Pizza } from "../../../dtos/Pizza";
import { PizzaCardContainer } from "./styles";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  return (
    <PizzaCardContainer>
      <img src={pizza.urlImagem}/>
      <p>Sabor: {pizza.sabor}</p>
      <p>Descrição: {pizza.descricao}</p>
      <p>Tamanho: {TipoTamanhoPizza[pizza.tamanho]}</p>
      <p>Massa: {TipoMassaPizza[pizza.massa]}</p>
      { pizza.recheioBorda && <p>Borda: {TipoRecheioBorda[pizza.recheioBorda]}</p> }
      { pizza.disponivel ? <p>DISPONIVEL NO BAGULHO</p> : <p>N TA DISPONIVEL NO BAGULHO</p>}
      <p>Preço: R$ {pizza.preco.toFixed(2)}</p>
    </PizzaCardContainer>
  );
}
