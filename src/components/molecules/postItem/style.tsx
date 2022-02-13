import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const List = styled.li``;

export const Inner = styled.div`
  position: relative;
`;

export const Icon = styled.figure`
  width: 43px;

  @media (max-width: 768px) {
    width: 43px;
  }
`;

export const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
`;
export const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
export const Header = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const UserName = styled.p`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
export const Date = styled.p`
  margin-left: 15px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 500;

  @media (max-width: 768px) {
    margin-top: 5px;
    margin-left: 0;
    font-size: 14px;
  }
`;
export const Text = styled.p`
  margin-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
export const ReplyText = styled.p`
  margin-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

export const ReplyLink = styled.a`
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

export const Wrap = styled.div`
  position: relative;
`;

export const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 14px;
  color: ${COLORS.WHITE};
`;

export const ReplyButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 130px;
  display: flex;
  align-items: center;
  z-index: 10;
  font-size: 14px;
  color: ${COLORS.WHITE};

  @media (max-width: 768px) {
    bottom: -24px;
    left: 90px;
  }
`;

export const ListLink = styled.a`
  padding: 20px 10px 50px;
  display: flex;
  width: 100%;
  cursor: pointer;
`;
