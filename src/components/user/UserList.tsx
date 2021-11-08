import PostItem from '../post/PostItem';
import styled from 'styled-components';

const UserList: React.FC<any> = ({ list }) => {
  return (
    <>
      <List>
        {list &&
          list.docs.map((doc: any, index: number) => (
            <PostItem
              key={index}
              uid={doc.id}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              detail={false}
              reply={false}
              createdAt={doc.data().createdAt}
            />
          ))}
      </List>
    </>
  );
};

export default UserList;


const List = styled.ul`
  border-top: 1px solid rgb(56, 68, 77);
`;