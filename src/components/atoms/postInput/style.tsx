import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Form = styled.form`
  padding: 25px 0;
  text-align: center;
  border-bottom: 1px solid rgb(56, 68, 77);
`;
export const StyledInput = styled.input`
  width: 500px;
  height: 120px;
  border: 1px solid gray;
  color: ${COLORS.WHITE};
  font-size: 14px;

  @media (max-width: 768px) {
    width: 90%;
    height: 100px;
  }
`;
