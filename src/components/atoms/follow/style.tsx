import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
`;

export const FollowButton = styled.button`
  padding: 10px 0;
  width: 140px;
  border-radius: 22px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: 1px solid #333;
`;
