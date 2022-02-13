import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Main = styled.div``;

export const List = styled.ul`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.ul`
  margin-left: ${(props) => props.marginLeft};
`;

export const DMButton = styled.button`
  padding: 10px 0;
  width: 140px;
  border-radius: 22px;
  background: #333;
  color: ${COLORS.WHITE};
  border: 1px solid #333;
`;
