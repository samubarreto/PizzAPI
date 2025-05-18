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
  Row,
  BottomRow,
  MiddleRow,
  Column
} from "./styles";
import { TipoMassaPizza } from "../../dtos/enums/TipoMassaPizza";
import { TipoRecheioBorda } from "../../dtos/enums/TipoRecheioBorda";
import { TipoTamanhoPizza } from "../../dtos/enums/TipoTamanhoPizza";
import { PIZZA_PLACEHOLDER } from "../../services/utils";
import { createCrudService } from "../../services/crudService";

interface ModalPizzaProps {
  pizza: Partial<Pizza> | null;
  onClose: () => void;
}

export function PizzaUpsertForm({ pizza, onClose }: ModalPizzaProps) {
  const [formState, setFormState] = useState<Partial<Pizza>>(pizza || {});
  const pizzaService = createCrudService<Pizza>("pizza");
  
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
      urlImagem: formState.urlImagem || PIZZA_PLACEHOLDER,
      atualizadoEm: new Date(),
    };
  
    await pizzaService.save(normalizedFormState as unknown as Partial<Pizza>);
    window.location.reload();
  };
  
  return (
    <FundoPreto>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{formState._id ? "Editar Pizza" : "Inserir Pizza"}</FormTitle>

        <Row>
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
        </Row>

        <Row>
          <label htmlFor="descricao">Descrição:</label>
          <FormTextarea
            id="descricao"
            name="descricao"
            placeholder="Descrição"
            value={formState.descricao || ""}
            onChange={handleChange}
            required
          />
        </Row>

        <Row>
          <label htmlFor="urlImagem">URL da Imagem:</label>
          <FormInput
            id="urlImagem"
            type="text"
            name="urlImagem"
            placeholder="URL da Imagem"
            value={formState.urlImagem}
            onChange={handleChange}
          />
          <img src={formState.urlImagem} onError={(e) => { const target = e.target as HTMLImageElement; target.src = PIZZA_PLACEHOLDER }}/>
        </Row>

        <Row style={{flexDirection:'row'}}>
          <Column>
            <label htmlFor="preco">Preço (R$):</label>
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
            </Column>

          <Column>
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
          </Column>

          <Column>
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
          </Column>
            
          <Column>
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
          </Column>
            
          <Column>
          <label htmlFor="recheioBorda">Borda:</label>
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
          </Column>
        </Row>

        <Row style={{flexDirection:'row'}}>
          <label htmlFor="disponivel">Disponível:</label>
          <input
            id="disponivel"
            type="checkbox"
            name="disponivel"
            checked={!!formState.disponivel}
            onChange={handleChange}
          />
        </Row>

        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}

export function PizzaDeleteForm({ pizza, onClose }: ModalPizzaProps) {
  const pizzaService = createCrudService<Pizza>("pizza");

  const handleDelete = async () => {
    if (pizza?._id) {
      await pizzaService.delete(pizza._id);
      window.location.reload();
    }
  };

  return (
    <FundoPreto>
      <Form onSubmit={(e) => { e.preventDefault(); handleDelete(); }} style={{width:'30dvw'}}>
        <FormTitle>Excluir Pizza</FormTitle>
        <MiddleRow>-Tem certeza de que deseja excluir a pizza de {pizza?.sabor}?</MiddleRow>
        <BottomRow>
          <CancelForm type="button" onClick={onClose}>Cancelar</CancelForm>
          <ConfirmForm type="submit">Confirmar</ConfirmForm>
        </BottomRow>
      </Form>
    </FundoPreto>
  );
}
