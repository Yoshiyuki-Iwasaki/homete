import PostItem from './PostItem';
import styled from 'styled-components';

const List = styled.ul`
`;

const PostList = ({ list }: any) => {
  return (
    <>
      <List>
        {list.map((doc: any, index: number) => (
          <PostItem
            key={index}
            id={doc.id}
            message={doc.message}
            userId={doc.userId}
            detail={false}
          />
        ))}
      </List>
    </>
  );
};

export default PostList;
