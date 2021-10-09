import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import PostText from './PostText';
import Reply from '../Reply';

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

const PostItem = ({ id, message, userId }: Props) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <List key={id}>
      <Inner>
        <PostText value={value} id={id} message={message} state={'post'} />
        <Reply postId={id} userData={value} />
      </Inner>
    </List>
  );
};


export default PostItem