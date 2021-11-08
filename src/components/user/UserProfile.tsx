import Link from 'next/link';
import styled from 'styled-components';
import { COLORS } from '../../utils/variable';
import { UserType } from '../../declarations/User';
import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';

const UserProfile: React.FC<any> = ({ displayName, photoURL, uid }) => {
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
`;

const UserName = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 22px;
  color: ${COLORS.WHITE};
  font-weight: 700;
`;
const TextArea = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const TitleLink = styled.a`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  &:first-child {
    margin-right: 10px;
  }
`;