import React from 'react'
import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Like from './Like';

const PostItem = ({ id, message, userId, createdAt }) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <li className="w-full flex p-4" key={id}>
      <a className="w-1/12" href={`user/${value.data().uid}`}>
        <img
          src={value.data().photoURL}
          className="rounded-full w-full border-4 border-pink-300"
          alt=""
        />
      </a>
      <div className="ml-5 w-11/12">
        <a href={`user/${value.data().uid}`}>
          <p className="text-2xl font-bold">{value.data().displayName}</p>
        </a>
        <p className="mt-2 text-xl">{message}</p>
        <Like postId={id} />
      </div>
    </li>
  );
};

export default PostItem
