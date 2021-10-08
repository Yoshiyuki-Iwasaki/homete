import PostItem from '../post/PostItem';
import styled from 'styled-components';

const List = styled.ul`
  margin-top: 20px;
  border-top: 1px solid rgb(56, 68, 77);
`;

const UserList = ({ list }: any) => {
  list && list.docs.map((doc: any, index: number) => console.log(doc.data()));
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
            />
          ))}
      </List>
    </>
  );
};

export default UserList;
