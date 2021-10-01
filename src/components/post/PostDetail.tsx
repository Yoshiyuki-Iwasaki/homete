import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import styled from 'styled-components';
import Like from '../Like';
interface Props {
  id:number;
  message: string;
  userId: number;
}

const Main = styled.div`
  margin: 20px auto 0;
  padding: 10px;
  max-width: 1000px;
  position: relative;
  z-index: 0;
`;
const Inner = styled.div`
  display: flex;
  width: 100%;
`;
const Icon = styled.a`
  width: 100px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
  }
`;
const IconImage = styled.img`
  border-radius: 50px;
  width: 100%;
  border: 3px solid pink;
`;
const TextArea = styled.div`
  margin-left: 10px;
`;
const UserName = styled.a`
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
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

const PostDetail = ({ id, message, userId }: Props) => {
  const db = firebase.firestore();
  const [value, loading, error] = useDocument(db.doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return (
    <Main>
      <Inner>
        <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
          <Icon>
            <IconImage src={value.data().photoURL} alt="" />
          </Icon>
        </Link>
        <TextArea>
          <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
            <UserName>{value.data().displayName}</UserName>
          </Link>
          <Text>{message}</Text>
        </TextArea>
      </Inner>
      <Like postId={id} />
    </Main>
  );
};

export default PostDetail;
