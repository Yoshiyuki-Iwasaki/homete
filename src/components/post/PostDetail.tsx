import firebase from '../../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import styled from 'styled-components';

const PostDetail = ({ todo }) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${todo.userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  const Main = styled.div`
    margin: 20px auto 0;
    width: 1000px;
  `;
  const Inner = styled.div`
    display: flex;
    align-items: center;
  `;
  const Icon = styled.a`
  `;
  const IconImage = styled.img`
    border-radius: 10px;
    width: 100%;
    border: 3px solid pink;
  `;
  const LinkText = styled.a`
  `;
  const UserName = styled.p`
    margin-left: 10px;
  `;
  const Text = styled.p`
    margin-top: 20px;
  `;

  return (
    <Main>
      <Inner>
        <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
          <Icon>
            <IconImage src={value.data().photoURL} alt="" />
          </Icon>
        </Link>
        <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
          <LinkText>
            <UserName>{value.data().displayName}</UserName>
          </LinkText>
        </Link>
      </Inner>
      <Text>{todo.message}</Text>
    </Main>
  );
};

export default PostDetail;
