import Follow from './Follow';
import firebase from '../../firebase/clientApp';
import UserTab from './UserTab';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const User = ({ todo }: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  const handleDM =() => {
    // console.log('test')
  };

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const Icon = styled.figure`
    margin: 0 auto;
    width: 300px;
  `;

  const IconImage = styled.img`
    border-radius: 150px;
    width: 100%;
    border: 3px solid pink;
  `;

  const UserName = styled.h1`
    margin-top: 20px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  `;

  const List = styled.ul`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ListItem = styled.ul`
    margin-left: ${(props) => props.marginLeft};
  `;

  const DMButton = styled.button`
    padding: 10px 0;
    width: 140px;
    border-radius: 22px;
    background: #333;
    color: #fff;
    border: 1px solid #333;
  `;

  return (
    <div className="mt-10">
      <Icon>
        <IconImage src={todo.photoURL} />
      </Icon>
      <UserName>{todo.displayName}</UserName>
      {user.uid != todo.uid && (
        <List>
          <ListItem marginLeft="0">
            <Follow userInfo={todo} />
          </ListItem>
          <ListItem marginLeft="10px">
            <DMButton onClick={handleDM}>DM</DMButton>
          </ListItem>
        </List>
      )}
      <UserTab todo={todo} />
    </div>
  );
};

export default User
