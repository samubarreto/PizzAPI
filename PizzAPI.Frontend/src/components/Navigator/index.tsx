import { NavigatorContainer, NavigatorItem } from "./styles";

export function PedidosNavigator() {
  return (
    <NavigatorContainer>
      <NavigatorItem to={"pedidos"}>Pedidos🛒</NavigatorItem>
    </NavigatorContainer>
  )
}

export function PizzasNavigator() {
  return (
    <NavigatorContainer>
      <NavigatorItem to={"pizzas"}>Pizzas🍕</NavigatorItem>
    </NavigatorContainer>
  )
}