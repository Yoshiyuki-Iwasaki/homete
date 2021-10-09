import Follow from '../Follow';
import firebase from '../../firebase/clientApp';
import UserTab from './UserTab';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  displayName: string;
  photoURL: string;
  uid: string;
}

const Main = styled.div`
  padding-top: 40px;
`;

const Icon = styled.figure`
  margin: 0 auto;
  width: 100px;

  @media (max-width: 768px) {
    width: 50%;
  }
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
  color: #fff;
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

const User = ({ displayName, photoURL, uid }: Props) => {
  const db = firebase.firestore();
  const router = useRouter();
  const [data, setData] = useState<boolean>(false);
  const [data02, setData02] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);
  const [groupe, groupeLoading, groupeError] = useCollection(
    db.collection('groupe').where('users', '==', [user.uid, uid]),
    {},
  );
  const [groupe02, groupe02Loading, groupe02Error] = useCollection(
    db.collection('groupe').where('users', '==', [uid, user.uid]),
    {},
  );

  useEffect(() => {
    (async (): Promise<any> => {
      await db.collection('groupe').onSnapshot((snapshot: any) => {
        snapshot.docs.map((doc) => {
          doc.data().users.map((doc) => {
            if (doc == user.uid) setData(true);
            if (doc == uid) setData02(true);
          });
        });
      });
    })();
  }, []);

  const checkGroupe = (groupe) => {
    groupe &&
      groupe.docs.map((doc, index) =>
        router.push(`/groupe/${doc.data().id}`, `/groupe/${doc.data().id}`),
      );
  };

  const handleDM = async (e: React.MouseEvent<HTMLInputElement>): Promise<any> => {
    e.preventDefault();

    if (!data && !data02)
      await db.collection('groupe').add({
        id: new Date().getTime(),
        users: [user.uid, uid],
        createdAt: updatedTime,
      });

    checkGroupe(groupe);
    checkGroupe(groupe02);
  };

  if (loading || groupeLoading || groupe02Loading) {
    return <h6>Loading...</h6>;
  }
  if (error || groupeError || groupe02Error) {
    return null;
  }

  return (
    <Main>
      <Icon>
        <IconImage src={photoURL} />
      </Icon>
      <UserName>{displayName}</UserName>
      {user.uid != uid && (
        <List>
          <ListItem marginLeft="0">
            <Follow uid={uid} />
          </ListItem>
          <ListItem marginLeft="10px">
            <DMButton onClick={handleDM}>DM</DMButton>
          </ListItem>
        </List>
      )}
      <UserTab uid={uid} />
    </Main>
  );
};

export default User
