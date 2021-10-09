import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import styled from 'styled-components';
import Like from '../Like';
import PostItem from './PostItem';
interface Props {
  id:number;
  message: string;
  userId: number;
}

const Main = styled.ul`
  margin: 0 auto;
  padding: 10px;
  max-width: 600px;
  position: relative;
  z-index: 0;
`;

const PostDetail = ({ id, message, userId }: Props) => {

  return (
    <Main>
      <PostItem id={id} message={message} userId={userId} />
    </Main>
  );
};

export default PostDetail;
