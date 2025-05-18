import { useEffect, useState } from "react"
import { Pizza } from '../../dtos/Pizza'
import { getCountPizzas, getPizzas } from "../../services/pizzaService";
import { useNavigation } from "simple-react-routing";
import { NovaPizza, PizzasContainer, UpperContainer } from "./styles";
import Loader from "../../components/Loader";
import { PizzaUpsertForm } from "./PizzaForms";
import PizzaCard from "./PizzaCard";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import { PedidosNavigator } from "../../components/Navigator";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState<Pizza[] | undefined>(undefined);
  const [pizzaInsert, setPizzaInsert] = useState<Pizza | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 
  const pageSize = 5;
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigateTo(null, '/pizzas');
    }
  }, [navigateTo]);

  const fetchPizzas = async () => {
    try {
      const res = await getPizzas((page - 1) * pageSize, pageSize, search);
      const count = await getCountPizzas();
      setPizzas(res);
  
      const totalPages = count > 0 ? Math.ceil(count / pageSize) : 1;
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchPizzas();
  }, [page, search]);

  return (
    <>
      { loading && <Loader />}
      
      { pizzaInsert && <PizzaUpsertForm pizza={pizzaInsert} onClose={() => setPizzaInsert(undefined)}/> }
      
      <UpperContainer>
        <PedidosNavigator/>
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
        <NovaPizza id="nova-pizza" onClick={() => setPizzaInsert({} as Pizza)}>Nova Pizza ➕</NovaPizza>
      </UpperContainer>
      
      { pizzas && <PizzasContainer id="pizzas-container">{ pizzas?.map((pizza) => (<PizzaCard key={pizza._id} pizza={pizza} />)) }</PizzasContainer>}
      { pizzas && <Pagination key={"pizza-pagination"} currentPage={page} totalPages={totalPages} onChangePage={setPage} /> }
    </>
  );
}