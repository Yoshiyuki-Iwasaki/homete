import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Like from '../Like';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  id: number;
  message: string;
  userId: number;
  createdAt: Date;
}

const List = styled.li`
  margin-top: 40px;
  padding: 10px;
  position: relative;
  z-index: 0;

  @media (max-width: 768px) {
    margin-top: 20px;
  }

  &::first-child {
    margin-top: 0;
  }
`;

const Inner = styled.div`
  position: relative;
`;

const ListLink = styled.a`
  display: flex;
  width: 100%;
  cursor: pointer;
`;
const Icon = styled.figure`
  width: 100px;

  @media (max-width: 768px) {
    width: 60px;
  }
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
  border: 1px solid gray;
`;
const TextArea = styled.div`
  margin-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
const UserName = styled.p`
  font-size: 15px;
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
const Text = styled.p`
  margin-top: 15px;
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const UserItem = ({ id, message, userId, createdAt }: Props) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return value.data() ? (
    <List key={id}>
      <Inner>
        <Link href={`/post/${id}`} as={`/post/${id}`}>
          <ListLink>
            <Icon>
              <IconImage src={value.data().photoURL} alt="" />
            </Icon>
            <TextArea>
              <UserName>{value.data().displayName}</UserName>
              <Text>{message}</Text>
            </TextArea>
          </ListLink>
        </Link>
        <Like postId={id} />
      </Inner>
    </List>
  ) : (
    ''
  );
};

export default UserItem;
