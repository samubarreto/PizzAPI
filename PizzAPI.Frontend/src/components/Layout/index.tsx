import { RenderComponent } from "simple-react-routing"
import { LayoutContainer } from "./styles"
import Header from "../Header"
import Footer from "../Footer"

export default function Layout() {
  return (
    <LayoutContainer>
      <Header/>
      <RenderComponent/>
      <Footer/>
    </LayoutContainer>
  )
}