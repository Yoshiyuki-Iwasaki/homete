import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const ListItem = styled.li`
  margin-top: 2px;
  padding: 10px;
  display: flex;
  width: 100%;
`;
export const Icon = styled.a`
  width: calc(100% / 12);

  @media (max-width: 768px) {
    width: 60px;
  }
`;
export const IconImg = styled.img`
  width: 100%;
  border: 1px solid pink;
  border-radius: 40px;
`;
export const TextArea = styled.div`
  margin-left: 20px;
  width: calc(100% - (100% / 12));
`;
export const LinkText = styled.a``;
export const Text = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.WHITE};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
