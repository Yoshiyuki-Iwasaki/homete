import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 60px;
  display: flex;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: -24px;
    left: 70px;
  }
`;

export const Button = styled.figure`
  margin-right: 5px;
  width: 20px;
  z-index: 100;
`;

export const LikeCount = styled.button`
  margin-left: 5px;
  font-size: 14px;
  color: ${COLORS.WHITE};
`;
