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
import { PIZZA_PLACEHOLDER } from "../../../services/utils";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const [pizzaDelete, setPizzaDelete] = useState<Pizza | undefined>(undefined);
  const [pizzaEdit, setPizzaEdit] = useState<Pizza | undefined>(undefined);

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
          <PizzaPreco>R$ {pizza.preco ? pizza.preco.toFixed(2) : 0}</PizzaPreco>
        </BottomContainer>
      </PizzaCardContainer>
    </>
  );
}
