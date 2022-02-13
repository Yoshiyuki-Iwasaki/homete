import PostItem from '../../molecules/postItem';
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
              createdAt={doc.data().createdAt}
              detail={false}
              reply={false}
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
