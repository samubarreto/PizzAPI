import { useEffect, useState } from "react"
import { Pizza } from '../../dtos/Pizza'
import { getCountPizzas, getPizzas } from "../../services/pizzaService";
import { useNavigation } from "simple-react-routing";
import { PizzasContainer } from "./styles";
import Loader from "../../components/Loader";
import { PizzaDeleteForm, PizzaUpsertForm } from "./PizzaForms";
import PizzaCard from "./PizzaCard";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import { PedidosNavigator } from "../../components/Navigator";

export default function Pizzas() {
  const [pizzas, setPizzas] = useState<Pizza[] | undefined>(undefined);
  const [pizzaEdit, setPizzaEdit] = useState<Pizza | undefined>(undefined);
  const [pizzaDelete, setPizzaDelete] = useState<Pizza | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 
  const pageSize = 10;
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
1
  return (
    <>
      { loading && <Loader />}
      { pizzaEdit && <PizzaUpsertForm pizza={pizzaEdit} onClose={() => setPizzaEdit(undefined)}/> }
      { pizzaDelete && <PizzaDeleteForm pizza={pizzaDelete} onClose={() => setPizzaDelete(undefined)} />}
      <PedidosNavigator/>
      <SearchBar onChange={(e) => setSearch(e.target.value)} />
      { pizzas && <PizzasContainer>{ pizzas?.map((pizza) => (<PizzaCard key={pizza._id} pizza={pizza} />)) }</PizzasContainer>}
      { pizzas && <Pagination currentPage={page} totalPages={totalPages} onChangePage={setPage} /> }
    </>
  );
}