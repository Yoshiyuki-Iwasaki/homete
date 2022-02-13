import Follow from '../../atoms/follow';
import firebase from '../../../firebase/clientApp';
import UserTab from '../userTab';
import UserProfile from '../userProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { UserType } from '../../../declarations/User';
import { Main, List, ListItem, DMButton } from './style';

const User: React.FC<UserType> = ({ displayName, photoURL, uid }) => {
  const db = firebase.firestore();
  const router = useRouter();
  const [data, setData] = useState<boolean>(false);
  const [data02, setData02] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    checkGroupe(groupe);
    checkGroupe(groupe02);
  };

  if (loading || groupeLoading || groupe02Loading) {
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  }
  if (error || groupeError || groupe02Error) {
    return null;
  }

  return (
    <Main>
      <UserProfile displayName={displayName} photoURL={photoURL} uid={uid} />
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

export default User;
