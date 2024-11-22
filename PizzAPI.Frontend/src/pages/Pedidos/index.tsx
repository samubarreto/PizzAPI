import { useEffect, useState } from "react";
import { PizzasNavigator } from "../../components/Navigator";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import { PedidoUpsertForm } from "./PedidoForms";
import { NovoPedido, PedidosContainer, UpperContainer } from "./styles";
import { Pedido } from "../../dtos/Pedido";
import Pagination from "../../components/Pagination";
import PedidoCard from "./PedidoCard";
import { getCountPedidos, getPedidos } from "../../services/pedidoService";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[] | undefined>(undefined);
  const [pedidoInsert, setPedidoInsert] = useState<Pedido | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 
  const pageSize = 5;

  const fetchPedidos = async () => {
    try {
      const res = await getPedidos((page - 1) * pageSize, pageSize, search);
      const count = await getCountPedidos();
      setPedidos(res);
  
      const totalPages = count > 0 ? Math.ceil(count / pageSize) : 1;
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchPedidos();
  }, [page, search]);

  return (
    <>
      { loading && <Loader /> }
      { pedidoInsert && <PedidoUpsertForm pedido={pedidoInsert!} onClose={() => setPedidoInsert(undefined)}/> }
      
      <UpperContainer>
        <PizzasNavigator/>
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
        <NovoPedido onClick={() => setPedidoInsert({} as Pedido)}>Novo Pedido ➕</NovoPedido>
      </UpperContainer>
      
      { pedidos && <PedidosContainer>{ pedidos?.map((pedido) => (<PedidoCard key={pedido._id} pedido={pedido} />)) }</PedidosContainer>}
      { pedidos && <Pagination currentPage={page} totalPages={totalPages} onChangePage={setPage} /> }
    </>
  );
}