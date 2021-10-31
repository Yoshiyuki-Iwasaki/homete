import styled from 'styled-components';
import PostItem from './PostItem';
import { PostDetailType } from '../../declarations/Post';

const PostDetail = ({ uid, id, message, userId, createdAt }: PostDetailType) => {
  return (
    <Main>
      <PostItem
        uid={uid}
        id={id}
        message={message}
        userId={userId}
        createdAt={createdAt}
        detail={true}
      />
    </Main>
  );
};

export default PostDetail;

const Main = styled.ul`
  margin: 0 auto;
  padding: 10px;
  max-width: 600px;
  position: relative;
  z-index: 0;
`;