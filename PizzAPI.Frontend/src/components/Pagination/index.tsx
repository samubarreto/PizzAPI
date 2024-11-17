import { PaginationButton, PaginationContainer, PaginationCounter } from "./styles";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChangePage }: IPaginationProps) {
  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={() => onChangePage(currentPage - 1)} 
        disabled={currentPage <= 1}>
        &lt;
      </PaginationButton>

      <PaginationCounter>
        Página {currentPage} de {totalPages}
      </PaginationCounter>

      <PaginationButton 
        onClick={() => onChangePage(currentPage + 1)} 
        disabled={currentPage >= totalPages}>
        &gt;
      </PaginationButton>
    </PaginationContainer>
  );
}
