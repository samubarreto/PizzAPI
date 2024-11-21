import { useState } from "react";
import { Pizza } from "../../dtos/Pizza";
import { FundoPreto } from "../../components/FundoPreto/styles";
import { 
  CancelForm, 
  ConfirmForm, 
  Form, 
  FormTitle, 
  FormInput, 
  FormSelect, 
  FormTextarea, 
  FlexRowSpace
} from "./styles";
import { TipoMassaPizza } from "../../dtos/enums/TipoMassaPizza";
import { TipoRecheioBorda } from "../../dtos/enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "../../dtos/enums/TipoTamanhoPizza";
import { salvarPizza, deletarPizza } from "../../services/pizzaService";

interface ModalPizzaProps {
  pizza: Partial<Pizza> | null;
  onClose: () => void;
}

export function PizzaUpsertForm({ pizza, onClose }: ModalPizzaProps) {
  const [formState, setFormState] = useState<Partial<Pizza>>(pizza || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const normalizedFormState = {
      ...formState,
      preco: formState.preco ? parseFloat(formState.preco.toString()) : 0,
      peso: formState.peso ? parseFloat(formState.peso.toString()) : 0,
      recheioBorda: formState.recheioBorda ? parseInt(formState.recheioBorda.toString(), 10) : 0,
      tamanho: formState.tamanho ? parseInt(formState.tamanho.toString(), 10) : 0,
      massa: formState.massa ? parseFloat(formState.massa.toString()) : 0,
      disponivel: !!formState.disponivel,
      urlImagem: formState.urlImagem || "https://thumbs.dreamstime.com/b/teste-padr%C3%A3o-sem-emenda-da-pizza-teste-padr%C3%A3o-da-pizza-do-vetor-89205691.jpg",
      atualizadoEm: new Date(),
    };
  
    await salvarPizza(normalizedFormState as unknown as Partial<Pizza>);
    window.location.reload();
  };
  

  return (
    <FundoPreto>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{formState._id ? "Editar Pizza" : "Inserir Pizza"}</FormTitle>

        <FlexRowSpace>
          <label htmlFor="sabor">Sabor:</label>
          <FormInput
            id="sabor"
            type="text"
            name="sabor"
            placeholder="Sabor"
            value={formState.sabor || ""}
            onChange={handleChange}
            required
          />
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="descricao">Descrição:</label>
          <FormTextarea
            id="descricao"
            name="descricao"
            placeholder="Descrição"
            value={formState.descricao || ""}
            onChange={handleChange}
            required
          />
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="urlImagem">URL da Imagem:</label>
          <FormInput
            id="urlImagem"
            type="text"
            name="urlImagem"
            placeholder="URL da Imagem"
            value={formState.urlImagem}
            onChange={handleChange}
          />
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="preco">Preço:</label>
          <FormInput
            id="preco"
            type="number"
            step="0.1"
            name="preco"
            placeholder="Preço"
            value={formState.preco}
            onChange={handleChange}
            required
          />
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="peso">Peso (kg):</label>
          <FormInput
            id="peso"
            type="number"
            step="0.1"
            name="peso"
            placeholder="Peso (kg)"
            value={formState.peso}
            onChange={handleChange}
            required
          />
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="massa">Tipo de Massa:</label>
          <FormSelect
            id="massa"
            name="massa"
            value={formState.massa || 0}
            onChange={handleChange}>
            <option value="" disabled>Selecione</option>
            {Object.entries(TipoMassaPizza)
              .filter(([value]) => isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
          </FormSelect>
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="tamanho">Tamanho:</label>
          <FormSelect
            id="tamanho"
            name="tamanho"
            value={formState.tamanho || 0}
            onChange={handleChange}>
            <option value="" disabled>Selecione</option>
            {Object.entries(TipoTamanhoPizza)
              .filter(([value]) => isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
          </FormSelect>
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="recheioBorda">Recheio da Borda:</label>
          <FormSelect
            id="recheioBorda"
            name="recheioBorda"
            value={formState.recheioBorda || 0}
            onChange={handleChange}>
            <option value="" disabled>Selecione</option>
            {Object.entries(TipoRecheioBorda)
              .filter(([value]) => isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
          </FormSelect>
        </FlexRowSpace>

        <FlexRowSpace>
          <label htmlFor="disponivel">Disponível:</label>
          <input
            id="disponivel"
            type="checkbox"
            name="disponivel"
            checked={!!formState.disponivel}
            onChange={handleChange}
          />
        </FlexRowSpace>

        <div>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
        </div>
      </Form>
    </FundoPreto>
  );
}

export function PizzaDeleteForm({ pizza, onClose }: ModalPizzaProps) {
  const handleDelete = async () => {
    if (pizza?._id) {
      await deletarPizza(pizza._id);
      window.location.reload();
    }
  };

  return (
    <FundoPreto>
      <Form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
        <FormTitle>Excluir Pizza</FormTitle>
        <p>Tem certeza de que deseja excluir a pizza de {pizza?.sabor}?</p>
        <div>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
        </div>
      </Form>
    </FundoPreto>
  );
}
