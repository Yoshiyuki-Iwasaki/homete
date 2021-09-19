import Follow from './Follow';
import firebase from '../../firebase/clientApp';
import UserTab from './UserTab';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import styled from 'styled-components';

const User = ({ todo }: any) => {
  const db = firebase.firestore();
  const router = useRouter();
  const [data, setData] = useState(false);
  const [data02, setData02] = useState(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);
  const [groupe, groupeLoading, groupeError] = useCollection(
    db.collection('groupe').where('users', '==', [user.uid, todo.uid]),
    {},
  );
  const [groupe02, groupe02Loading, groupe02Error] = useCollection(
    db.collection('groupe').where('users', '==', [todo.uid, user.uid]),
    {},
  );

  useEffect(() => {
    (async () => {
      await db.collection('groupe').onSnapshot((snapshot: any) => {
        snapshot.docs.map((doc) => {
          doc.data().users.map((doc) => {
            if (doc == user.uid) {
              setData(true);
            }
            if (doc == todo.uid) {
              setData02(true);
            }
          });
        });
      });
    })();
  }, []);

  const handleDM = async (e) => {
    e.preventDefault();

    if (!data && !data02) {
      await db.collection('groupe').add({
        id: new Date().getTime(),
        users: [user.uid, todo.uid],
        createdAt: updatedTime,
      });
    }
    groupe && groupe.docs.map((doc, index) => router.push(`/groupe/${doc.data().id}`));
    groupe02 && groupe02.docs.map((doc, index) => router.push(`/groupe/${doc.data().id}`));
  };

  if (loading || groupeLoading || groupe02Loading) {
    return <h6>Loading...</h6>;
  }
  if (error || groupeError || groupe02Error) {
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
