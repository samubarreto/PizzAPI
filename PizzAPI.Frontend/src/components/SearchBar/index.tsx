import { SearchBarContainer, SearchBarInput } from "./styles";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <SearchBarContainer>
      <SearchBarInput
        placeholder="Busque sua Pizza favorita pelo sabor, descrição ou ingredientes🔍"
        onChange={onChange}
      />
    </SearchBarContainer>
  );
}
