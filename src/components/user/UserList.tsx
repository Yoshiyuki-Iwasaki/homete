import PostItem from '../post/PostItem';
import styled from 'styled-components';

const List = styled.ul`
  border-top: 1px solid rgb(56, 68, 77);
`;

const UserList = ({ list }: any) => {
  return (
    <>
      <List>
        {list &&
          list.docs.map((doc: any, index: number) => (
            <PostItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              detail={false}
            />
          ))}
      </List>
    </>
  );
};

export default UserList;
