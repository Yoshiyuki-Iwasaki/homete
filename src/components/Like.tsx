import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Like = ({ postId }) => {
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
      .where('post_id', '==', postId)
      .where('user_uid', '==', user.uid)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickLikeButton = async () => {
    await db.collection('likes').add({
      id: new Date().getTime(),
      post_id: postId,
      user_uid: user.uid,
      createdAt: updatedTime,
    });
    handleLike();
  };

  const clickRemoveLikeButton = async () => {
    const citiesRef = await db
      .collection('likes')
      .where('post_id', '==', postId)
      .where('user_uid', '==', user.uid).get();
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
