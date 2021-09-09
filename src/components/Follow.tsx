import firebase from '../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Follow = ({ userId }: any) => {
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
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', userId)
      .get();
    citiesRef.forEach(() => {
      setDone(true);
    });
  };

  const clickFollowButton = async () => {
    await db.collection('follows').add({
      id: new Date().getTime(),
      following_uid: user.uid,
      followed_uid: userId,
      createdAt: updatedTime,
    });
    handleLike();
  };

  const clickUnfollowButton = async () => {
    const citiesRef = await db
      .collection('follows')
      .where('following_uid', '==', user.uid)
      .where('followed_uid', '==', userId)
      .get();
    citiesRef.forEach((postDoc) => {
      db.collection('follows').doc(postDoc.id).delete();
    });
    setDone(false);
  };

  return (
    <div className="mt-5 text-center">
      {!done ? (
        <button onClick={clickFollowButton}>Follow</button>
      ) : (
        <button onClick={clickUnfollowButton}>Unfollow</button>
      )}
    </div>
  );
};

export default Follow;
