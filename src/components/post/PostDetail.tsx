import styled from 'styled-components';
import PostItem from './PostItem';
import { PostDetailType } from '../../declarations/Post';

const PostDetail = ({ id, message, userId }: PostDetailType) => {
  return (
    <Main>
      <PostItem id={id} message={message} userId={userId} detail={true} />
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