import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const Like = ({ postId }: any) => {
  const db = firebase.firestore();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);
  const [done, setDone] = useState(false);
  const [likeCount, setlikeCount] = useState(0);

  if (userLoading) {
    return <h6>Loading...</h6>;
  }
  if (userError) {
    return null;
  }

  useEffect(() => {
    handleLike();
    CountLike();
  });

  const CountLike = async () => {
    await db
      .collection('likes')
      .where('postId', '==', postId)
      .get()
      .then((snap) => {
        const size = snap.size;
        setlikeCount(size);
      });
  };

  const handleLike = async () => {
    const citiesRef = await db
      .collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', user.uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickLikeButton = async () => {
    await db.collection('likes').add({
      id: new Date().getTime(),
      postId: postId,
      userId: user.uid,
      createdAt: updatedTime,
    });
    handleLike();
  };

  const clickRemoveLikeButton = async () => {
    const citiesRef = await db
      .collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', user.uid)
      .get();
    citiesRef.forEach((postDoc) => {
      db.collection('likes').doc(postDoc.id).delete();
    });
    setDone(false);
  };

  const Wrapper = styled.div`
    position: absolute;
    bottom: 10px;
    left: 135px;
    display: flex;
    align-items: center;
    z-index: 10;
  `;

  const Button = styled.figure`
    width: 25px;
    z-index: 100;
  `;

  const LikeCount = styled.button`
    margin-left: 5px;
    font-size: 14px;
    color: gray;
  `;

  return (
    <Wrapper>
      {!done ? (
        <Button onClick={clickLikeButton}>
          <img src={`/image/icon_like.png`} alt="" />
        </Button>
      ) : (
        <Button onClick={clickRemoveLikeButton}>
          <img src={`/image/icon_liked.png`} alt="" />
        </Button>
      )}
      <LikeCount>{likeCount}</LikeCount>
    </Wrapper>
  );
};

export default Like;
