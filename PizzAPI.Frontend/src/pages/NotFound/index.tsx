import { Link } from "simple-react-routing"
import { NotFoundContainer, NotFoundH1, NotFoundUrl, NotFoundButton } from "./styles"

export default function NotFoundPage() {
  return (
    <>
      <NotFoundContainer>
        <NotFoundH1>Página não encontrada! 🦖</NotFoundH1>
        <NotFoundUrl>{window.location.protocol}//{window.location.host}{window.location.pathname}</NotFoundUrl>
        <Link to="/"><NotFoundButton>&lt; Voltar ao Início</NotFoundButton></Link>
      </NotFoundContainer>
    </>
  )
}