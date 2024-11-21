import { useState } from "react";
import { TipoMassaPizza } from "../../../dtos/enums/TipoMassaPizza";
import { TipoRecheioBorda } from "../../../dtos/enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "../../../dtos/enums/TipoTamanhoPizza";
import { Pizza } from "../../../dtos/Pizza";
import { 
  PizzaCardContainer, 
  FlexRow, 
  PizzaDescricao, 
  PizzaDisponivel, 
  PizzaIndisponivel, 
  PizzaNome, 
  PizzaPreco, 
  PizzaSpan, 
  PizzaImagem, 
  BottomContainer,
  BotaoPizza
} from "./styles";
import { PizzaDeleteForm, PizzaUpsertForm } from "../PizzaForms";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const [pizzaDelete, setPizzaDelete] = useState<Pizza | undefined>(undefined);
  const [pizzaEdit, setPizzaEdit] = useState<Pizza | undefined>(undefined);
  const PIZZA_PLACEHOLDER = "https://img.freepik.com/fotos-gratis/natureza-morta-de-pratos-de-fast-food_23-2149187946.jpg?t=st=1732230116~exp=1732233716~hmac=abcde0a69cf23d7af43614b0b6a1de2e0dfbc09e872feb85805b57e076ac1803&w=1060";

  return (
    <>
      { pizzaEdit && <PizzaUpsertForm pizza={pizzaEdit} onClose={() => setPizzaEdit(undefined)}/> }
      { pizzaDelete && <PizzaDeleteForm pizza={pizzaDelete} onClose={() => setPizzaDelete(undefined)}/>}
      <PizzaCardContainer>
        <PizzaImagem src={pizza.urlImagem || PIZZA_PLACEHOLDER} onError={(e) => { const target = e.target as HTMLImageElement; target.src = PIZZA_PLACEHOLDER }} />
        <PizzaNome>Pizza de {pizza.sabor}</PizzaNome>
        <PizzaDescricao>{pizza.descricao}</PizzaDescricao>
        <FlexRow>
          <PizzaSpan>Tamanho: {TipoTamanhoPizza[pizza.tamanho]}</PizzaSpan>
          <PizzaSpan>Massa: {TipoMassaPizza[pizza.massa]}</PizzaSpan>
          {pizza.recheioBorda != undefined && <PizzaSpan>Borda: {TipoRecheioBorda[pizza.recheioBorda]}</PizzaSpan>}
          {pizza.disponivel ? <PizzaDisponivel>DISPONÍVEL</PizzaDisponivel> : <PizzaIndisponivel>INDISPONÍVEL</PizzaIndisponivel>}
        </FlexRow>
        <BottomContainer>
          <div>
            <BotaoPizza onClick={() => setPizzaEdit(pizza)}>✏️Editar</BotaoPizza>
            <BotaoPizza onClick={() => setPizzaDelete(pizza)}>🗑️Deletar</BotaoPizza>
          </div>
          <PizzaPreco>R$ {pizza.preco.toFixed(2)}</PizzaPreco>
        </BottomContainer>
      </PizzaCardContainer>
    </>
  );
}
