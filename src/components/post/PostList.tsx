import PostItem from './PostItem';
import styled from 'styled-components';

const List = styled.ul`
  margin-top: 20px;
`

const PostList = ({ list }: any) => {
  return (
    <>
      <List>
        {list &&
          list.map((doc: any, index: number) => (
            <PostItem
              key={index}
              id={doc.id}
              message={doc.message}
              userId={doc.userId}
              createdAt={doc.createdAt}
            />
          ))}
      </List>
    </>
  );
};

export default PostList;
