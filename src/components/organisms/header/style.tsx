import styled from 'styled-components';
import { COLORS } from '../../../utils/variable';

export const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
  background: rgb(21, 32, 43);
  border-bottom: 1px solid rgb(56, 68, 77);
`;
export const Inner = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.h1``;
export const TitleLink = styled.a`
  font-size: 30px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const Form = styled.form`
  margin-right: 30px;
`;
export const Label = styled.label`
  margin-right: 10px;
  font-size: 13px;
  color: ${COLORS.WHITE};
`;
export const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid gray;
`;
export const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const UserName = styled.span`
  cursor: pointer;
  font-size: 15px;
  color: ${COLORS.WHITE};
  letter-spacing: 0.025em;
  font-weight: 700;
`;
export const Hover = styled.div`
  position: relative;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Icon = styled.figure`
  margin-left: 10px;
  width: 40px;
`;
export const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
export const List = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  &:before {
    content: '';
    position: absolute;
    top: -4px;
    right: 25px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    background: gray;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  ${Hover}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
export const ListItem = styled.li`
  background: gray;
`;
export const ListLink = styled.a`
  padding: 15px 5px;
  display: inline-block;
  border-bottom: 1px solid ${COLORS.WHITE};
  width: 200px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;
export const Button = styled.a`
  padding: 15px 5px;
  display: inline-block;
  cursor: pointer;
  width: 200px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;
