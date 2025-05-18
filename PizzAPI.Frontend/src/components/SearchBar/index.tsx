import { SearchBarInput } from "./styles";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <SearchBarInput id="searchbar" placeholder="🔍 Busque sua Pizza favorita pelo sabor, descrição ou preço" onChange={onChange}/>
  );
}
