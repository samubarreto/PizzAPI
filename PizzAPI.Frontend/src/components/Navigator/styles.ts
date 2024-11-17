import { Link } from 'simple-react-routing';
import styled from 'styled-components';

export const NavigatorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const NavigatorItem = styled(Link)`
  all: unset;
  background-color: rgba(110 ,110, 110, .5);
  padding: 8px 100px;
  border-radius: 18px;
  cursor: pointer;
  transition: all .15s;
  font-size: 1.2rem;
  &:hover {
    background-color: #fff;
    color: #222222;
  }
`;