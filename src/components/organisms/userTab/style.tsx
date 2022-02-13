import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Wrapper = styled.div`
  margin: 20px auto 0;
  max-width: 600px;
`;

export const UpperList = styled.ul`
  display: flex;
  justify-content: center;
`;

export const List = styled.ul``;

export const Button = styled.button`
  padding: 10px 0;
  display: inline-block;
  text-align: center;
  width: 33.333%;
  cursor: pointer;
  font-size: 15px;
  color: ${(props) => (props.openTab === props.tab ? `${COLORS.WHITE}` : 'rgb(136, 153, 166)')};
  ${(props) => props.openTab === props.tab && `border-bottom: 3px solid ${COLORS.WHITE};`};

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const ListItem = styled.li`
  display: ${(props) => (props.openTab === props.tab ? 'block' : 'none')};
`;
