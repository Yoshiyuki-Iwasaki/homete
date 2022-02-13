import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const Main = styled.div`
  padding-top: 40px;
`;

export const Icon = styled.figure`
  margin: 0 auto;
  width: 100px;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const IconImage = styled.img`
  border-radius: 150px;
  width: 100%;
`;

export const UserName = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 22px;
  color: ${COLORS.WHITE};
  font-weight: 700;
`;
export const TextArea = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const TitleLink = styled.a`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  &:first-child {
    margin-right: 10px;
  }
`;
