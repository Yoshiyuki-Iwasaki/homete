import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { COLORS } from '../../utils/variable';
import { LikeType } from '../../declarations/Like';


const Like: React.FC<LikeType> = ({ postId }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [done, setDone] = useState<boolean>(false);
  const [likeCount, setlikeCount] = useState<number>(0);

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  useEffect(() => {
    handleLike();
    CountLike();
  });

  const CountLike = async (): Promise<any> => {
    await db
      .collection('likes')
      .where('postId', '==', postId)
      .get()
      .then((snap) => {
        const size = snap.size;
        setlikeCount(size);
      });
  };

  const handleLike = async (): Promise<any> => {
    const citiesRef = await db
      .collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', user.uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickLikeButton = async (): Promise<any> => {
    await db.collection('likes').add({
      id: new Date().getTime(),
      postId: postId,
      userId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    handleLike();
  };

  const clickRemoveLikeButton = async (): Promise<any> => {
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

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 60px;
  display: flex;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: -24px;
    left: 70px;
  }
`;

const Button = styled.figure`
  margin-right: 5px;
  width: 20px;
  z-index: 100;
`;

const LikeCount = styled.button`
  margin-left: 5px;
  font-size: 14px;
  color: ${COLORS.WHITE};
`