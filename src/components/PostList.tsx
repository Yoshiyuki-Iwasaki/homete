import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';

const Post = () => {
  const [todolists, todolistsLoading, todolistsError] = useCollection(
    firebase.firestore().collection('textList').orderBy('id', 'desc'),
    {},
  );
  return (
    <>
      <ul className="mt-10">
        {todolists &&
          todolists.docs.map((doc, index) => (
            <PostItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </ul>
    </>
  );
};

export default Post;
