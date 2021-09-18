import firebase from '../../firebase/clientApp';
import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { memo } from "react";
import styled from 'styled-components';

const Follow = memo(({ userInfo }:any) => {
  const db = firebase.firestore();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);
  const [done, setDone] = useState(false);

  if (userLoading) {
    return <h6>Loading...</h6>;
  }
  if (userError) {
    return null;
  }

  useEffect(() => {
    handleFollow();
  }, []);

  const handleFollow = async () => {
    const citiesRef = await db
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', userInfo.uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickFollowButton = async () => {
    await db.collection('follows').add({
      id: new Date().getTime(),
      following_uid: user.uid,
      followed_uid: userInfo.uid,
      createdAt: updatedTime,
    });
    handleFollow();
  };

  const clickUnfollowButton = async () => {
    const citiesRef = await db
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', userInfo.uid)
      .get();
    citiesRef.forEach((postDoc) => {
      db.collection('follows').doc(postDoc.id).delete();
    });
    setDone(false);
  };

  console.log('test');

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
