import PostItem from '../../molecules/postItem';
import styled from 'styled-components';
import React from 'react';

const PostList: React.FC<any> = ({ list }) => {
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
