import Link from 'next/link';
import { UserType } from '../../../declarations/User';
import firebase from '../../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { Main, Icon, IconImage, UserName, TextArea, TitleLink } from './style';

const UserProfile: React.FC<UserType> = ({ displayName, photoURL, uid }) => {
  const db = firebase.firestore();
  const [followCount, setfollowCount] = useState<number>(0);
  const [followerCount, setfollowerCount] = useState<number>(0);

  useEffect(() => {
    countFollow();
    countfollower();
  }, []);

  const countFollow = async () => {
    await db
      .collection('follows')
      .where('following_uid', '==', uid)
      .get()
      .then((snap) => {
        const size = snap.size;
        setfollowCount(size);
      });
  };

  const countfollower = async () => {
    await db
      .collection('follows')
      .where('followed_uid', '==', uid)
      .get()
      .then((snap) => {
        const size = snap.size;
        setfollowerCount(size);
      });
  };

  return (
    <Main>
      <Icon>
        <IconImage src={photoURL} />
      </Icon>
      <UserName>{displayName}</UserName>
      <TextArea>
        <Link href={`/user/follow/${uid}`} as={`/user/follow/${uid}`} passHref>
          <TitleLink>フォロー {followCount}</TitleLink>
        </Link>
        <Link href={`/user/follow/${uid}`} as={`/user/follow/${uid}`} passHref>
          <TitleLink>フォロワー {followerCount}</TitleLink>
        </Link>
      </TextArea>
    </Main>
  );
};

export default UserProfile;
