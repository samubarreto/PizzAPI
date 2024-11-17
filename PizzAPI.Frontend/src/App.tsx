import { BrowserRouter } from 'simple-react-routing';
import Layout from './components/Layout';
import Pizzas from './pages/Pizzas';
import Pedidos from './pages/Pedidos';
import NotFoundPage from './pages/NotFound';
import './App.css'

export default function App() {
  return (
    <BrowserRouter
      notFoundPage={<NotFoundPage/>}
      routes={[
        { path: "", component: <Pizzas /> },
        { path: "pizzas", component: <Pizzas/> },
        { path: "pedidos", component: <Pedidos/> },
      ]}>
      <Layout/>
    </BrowserRouter>
  )
}