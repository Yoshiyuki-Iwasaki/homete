import styled from 'styled-components';
import PostItem from './PostItem';
interface Props {
  id: number;
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
      <PostItem id={id} message={message} userId={userId} detail={true} />
    </Main>
  );
};

export default PostDetail;
