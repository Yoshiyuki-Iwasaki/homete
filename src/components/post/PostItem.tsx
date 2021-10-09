import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Like from '../Like';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  id: number;
  message: string;
  userId: number;
}

const List = styled.li`
`;

const Inner = styled.div`
  position: relative;
`;

const ListLink = styled.a`
  padding: 20px 10px 50px;
  display: flex;
  width: 100%;
  position: relative;
  border-top: 1px solid rgb(56, 68, 77);
  cursor: pointer;
`;
const Icon = styled.figure`
  width: 50px;

  @media (max-width: 768px) {
    width: 50px;
  }
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
  border: 1px solid gray;
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
  color: #fff;
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
const Text = styled.p`
  margin-top: 15px;
  color: #fff;
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const PostItem = ({ id, message, userId }: Props) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <List key={id}>
      <Inner>
        <Link href={`/post/${id}`} as={`/post/${id}`} passHref>
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
        <p>リプライが入ります。</p>
      </Inner>
    </List>
  );
};

export default PostItem
