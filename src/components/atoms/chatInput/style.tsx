import styled from 'styled-components';
import { pc, sp } from '../../../utils/media';
import { COLORS } from '../../../utils/variable';

export const Form = styled.form`
  text-align: center;
`;
export const Input = styled.input`
  width: calc(100% / 3);
  height: 200px;
  border: 1px solid gray;

  ${sp`
  width: 70%;
  height: 90px;
`}
`;
export const Button = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid gray;
  color: ${COLORS.WHITE};
  transition: all 0.6s;
  cursor: pointer;
`;
