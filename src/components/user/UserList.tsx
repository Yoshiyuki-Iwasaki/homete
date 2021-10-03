import UserItem from './UserItem';
import styled from 'styled-components';

const List = styled.ul`
  margin-top: 20px;
`

const UserList = ({ list }: any) => {
  list && list.docs.map((doc: any, index: number) => console.log(doc.data()));
  return (
    <>
      <List>
        {list &&
          list.docs.map((doc: any, index: number) => (
            <UserItem
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

export default UserList;
