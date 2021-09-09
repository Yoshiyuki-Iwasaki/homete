import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Like = ({ postId }: any) => {
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
    handleLike();
  }, []);

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
  return (
    <>
      {!done ? (
        <button className="mt-2" onClick={clickLikeButton}>
          いいね
        </button>
      ) : (
        <button className="mt-2" onClick={clickRemoveLikeButton}>
          いいね済み
        </button>
      )}
    </>
  );
};

export default Like;
