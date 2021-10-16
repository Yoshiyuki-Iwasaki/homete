import { useState } from 'react';
import firebase from '../../firebase/clientApp';
import Link from 'next/link';
import styled from 'styled-components';
import Like from '../Like';
import { COLORS } from '../utils/variable';

const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
`;
const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
const UserName = styled.p`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
const Text = styled.p`
  margin-top: 20px;
  color: ${COLORS.WHITE};
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const ReplyText = styled.p`
  margin-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

const ReplyLink = styled.a`
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

const Wrap = styled.div`
  position: relative;
`;

interface Props {
  value: any;
  id: number;
  message: string;
  state: 'post'| 'reply';
}

const PostText: React.FC<Props> = ({ value, id, message, state }) => {

  const ListLink = styled.a`
    padding: 20px 10px 50px;
    display: flex;
    width: 100%;
    ${({ state }) => (state == 'post' ? `border-top: 1px solid rgb(56, 68, 77);;` : '')}
    cursor: pointer;
  `;
  const Icon = styled.figure`
    width: 50px;

    @media (max-width: 768px) {
      width: 50px;
    }
  `;

  return (
    <Wrap>
      <Link href={`/post/${id}`} as={`/post/${id}`} passHref>
        <ListLink>
          <Icon>
            <IconImage src={value.data().photoURL} alt="" />
          </Icon>
          <TextArea>
            <UserName>{value.data().displayName}</UserName>
            {state === 'reply' && (
              <ReplyText>
                返信先:
                <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`} passHref>
                  <ReplyLink>@{value.data().uid}</ReplyLink>
                </Link>
              </ReplyText>
            )}
            <Text>{message}</Text>
          </TextArea>
        </ListLink>
      </Link>
      <Like postId={id} />
    </Wrap>
  );
};

export default PostText
