import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';
import PostText from './PostText';
import Loader from 'react-loader-spinner';

interface Props {
  postId: number;
  userData: any;
}

const Reply: React.FC<Props> = ({ postId, userData }) => {
  const db = firebase.firestore();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [data, loading, error] = useCollection(
    db.collection('reply').where('postId', '==', postId),
    {},
  );

  if (loading || userLoading) {
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  }

  if (error || userError) return;

  return (
    <>
      {data &&
        data.docs.map((data, index) => (
          <PostText
            key={index}
            value={userData}
            id={data.data().id}
            message={data.data().message}
            state={'reply'}
          />
        ))}
    </>
  );
};

export default Reply;
