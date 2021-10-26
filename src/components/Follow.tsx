import firebase from '../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { memo } from "react";
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { FollowType } from '../declarations/Follow';

const Follow = memo(({ uid }: FollowType) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);
  const [done, setDone] = useState(false);

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  useEffect(() => {
    handleFollow();
  }, []);

  const handleFollow = async (): Promise<any> => {
    const citiesRef = await db
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickFollowButton = async (): Promise<any> => {
    await db.collection('follows').add({
      id: new Date().getTime(),
      following_uid: user.uid,
      followed_uid: uid,
      createdAt: updatedTime,
    });
    handleFollow();
  };

  const clickUnfollowButton = async (): Promise<any> => {
    const citiesRef = await db
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', uid)
      .get();
    citiesRef.forEach((postDoc) => {
      db.collection('follows').doc(postDoc.id).delete();
    });
    setDone(false);
  };

  return (
    <Wrapper>
      {!done ? (
        <FollowButton color="#fff" bgColor="#333" onClick={clickFollowButton}>
          フォロー
        </FollowButton>
      ) : (
        <FollowButton color="#333" bgColor="#fff" onClick={clickUnfollowButton}>
          フォロー中
        </FollowButton>
      )}
    </Wrapper>
  );
});

export default Follow;


const Wrapper = styled.div`
  text-align: center;
`;

const FollowButton = styled.button`
  padding: 10px 0;
  width: 140px;
  border-radius: 22px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: 1px solid #333;
`;