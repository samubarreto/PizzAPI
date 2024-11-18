import { TipoMassaPizza } from "../../../dtos/enums/TipoMassaPizza";
import { TipoRecheioBorda } from "../../../dtos/enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "../../../dtos/enums/TipoTamanhoPizza";
import { Pizza } from "../../../dtos/Pizza";
import { PizzaCardContainer, FlexRow, Ingrediente, Ingredientes, PizzaDescricao, PizzaDisponivel, PizzaIndisponivel, PizzaNome, PizzaPreco, PizzaSpan, PizzaImagem,  } from "./styles";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  return (
    <PizzaCardContainer>
      <PizzaImagem src={pizza.urlImagem}/>
      <PizzaNome>Pizza de {pizza.sabor}</PizzaNome>
      <PizzaDescricao>{pizza.descricao}</PizzaDescricao>
      <FlexRow>
        <PizzaSpan>{TipoTamanhoPizza[pizza.tamanho]}</PizzaSpan>
        <PizzaSpan>{TipoMassaPizza[pizza.massa]}</PizzaSpan>
        { pizza.recheioBorda && <PizzaSpan>{TipoRecheioBorda[pizza.recheioBorda]}</PizzaSpan> }
        { pizza.disponivel ? <PizzaDisponivel>DISP</PizzaDisponivel> : <PizzaIndisponivel>INDISP</PizzaIndisponivel>}
      </FlexRow>
      <PizzaDescricao>Ingredientes:</PizzaDescricao>
      <Ingredientes>
        <Ingrediente>alface</Ingrediente>
        <Ingrediente>tomate</Ingrediente>
        <Ingrediente>cebola</Ingrediente>
      </Ingredientes>
      <PizzaPreco>R$ {pizza.preco.toFixed(2)}</PizzaPreco>
    </PizzaCardContainer>
  );
}
