import React from "react";
import Follow from './Follow';
import PostList from './PostList';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';


const User = ({ todo }) => {
  const db = firebase.firestore();
  const [list, loading, error] = useCollection(
    db.collection('textList').where('userId', '==', todo.uid),
    {},
  );
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <div className="mt-32">
      <figure className="w-1/5 mx-auto">
        <img
          className="rounded-full w-full border-4 border-light-blue-500 border-opacity-25"
          src={todo.photoURL}
        />
      </figure>
      <h1 className="mt-3 text-center text-2xl font-bold">{todo.displayName}</h1>
      <Follow userId={todo} />
      <PostList list={list} />
    </div>
  );
};

export default User
