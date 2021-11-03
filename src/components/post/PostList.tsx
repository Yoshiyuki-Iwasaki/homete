import PostItem from './PostItem';
import styled from 'styled-components';

const PostList = ({ list }: any) => {
  return (
    <>
      <List>
        {list.docs.map((doc: any, index: number) => (
          <PostItem
            key={index}
            uid={doc.id}
            id={doc.data().id}
            message={doc.data().message}
            userId={doc.data().userId}
            createdAt={doc.data().createdAt}
            detail={false}
            reply={false}
          />
        ))}
      </List>
    </>
  );
};

export default PostList;

const List = styled.ul``;