import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import PostText from './PostText';
import Reply from '../Reply';
import Loader from 'react-loader-spinner';

interface Props {
  id: number;
  message: string;
  userId: number;
  detail: boolean;
}

const List = styled.li`
`;

const Inner = styled.div`
  position: relative;
`;

const PostItem = ({ id, message, userId, detail }: Props) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <List key={id}>
      <Inner>
        <PostText value={value} id={id} message={message} state={'post'} />
        {detail && <Reply postId={id} userData={value} />}
      </Inner>
    </List>
  );
};


export default PostItem