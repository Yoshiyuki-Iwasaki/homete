import PostItem from '../post/PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const UserList = ({ list }: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  }
  if (error) {
    return null;
  }
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