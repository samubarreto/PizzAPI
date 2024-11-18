import { Link } from 'simple-react-routing';
import styled from 'styled-components';

export const NavigatorItem = styled(Link)`
  all: unset;
  color: #fff;
  background-color: rgba(110 ,110, 110, .5);
  padding: 3px 20px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  cursor: pointer;
  transition: all .15s;
  &:hover {
    background-color: #fff;
    color: #222222;
  }
`;