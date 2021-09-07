import React from 'react'
import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';


const PostItem = ({ id, message, userId, createdAt }) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <li className="p-4" key={id}>
      <a className="w-full flex" href={`user/${value.data().uid}`}>
        <figure className="w-1/12">
          <img
            src={value.data().photoURL}
            className="rounded-full w-full border-4 border-pink-300"
            alt=""
          />
        </figure>
        <div className="ml-5 w-11/12">
          <p className="text-2xl font-bold">{value.data().displayName}</p>
          <p className="mt-5 text-xl">{message}</p>
        </div>
      </a>
    </li>
  );
};

export default PostItem
