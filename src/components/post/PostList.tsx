import PostItem from './PostItem';
import styled from 'styled-components';

const List = styled.ul`
  margin-top: 20px;
`

const Post = ({ list }: any) => {
  return (
    <>
      <List>
        {list &&
          list.docs.map((doc, index) => (
            <PostItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </List>
    </>
  );
};

export default Post;
