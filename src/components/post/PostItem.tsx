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

const PostItem = ({ id, message, userId, createdAt }: Props) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  const List = styled.li`
    padding: 10px;
    position: relative;
    z-index: 0;
  `;

  const ListLink = styled.a`
    display: flex;
    width: 100%;
    cursor: pointer;
  `;
  const Icon = styled.figure`
    width: 100px;
  `;
  const IconImage = styled.img`
    width: 100%;
    border-radius: 50px;
    border: 1px solid gray;
  `;
  const TextArea = styled.div`
    margin-left: 10px;
    width: calc(100% - 100px);
  `;
  const UserName = styled.p`
    font-size: 18px;
    font-weight: 700;
  `;
  const Text = styled.p`
    margin-top: 10px;
    font-size: 15px;
  `;

  return value.data() ? (
    <List key={id}>
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
    </List>
  ) : (
    ''
  );
};

export default PostItem
