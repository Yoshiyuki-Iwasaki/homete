import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Main = styled.div`
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(56, 68, 77);
  z-index: 30;
`;
export const Title = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${COLORS.WHITE};
  font-weight: 700;
`;
export const Form = styled.form`
  margin-top: 20px;
  text-align: center;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
`;
