import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Post = () => {
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [todolists, todolistsLoading, todolistsError] = useCollection(
    firebase.firestore().collection('textList').orderBy('id', 'desc'),
    {},
  );
  return (
    <>
      <ul className='mt-10'>
        {todolists &&
          todolists.docs.map((doc, index) => (
            <li className="flex p-4" key={doc.data().id}>
              <figure className="w-1/12">
                <img
                  className="rounded-full w-full border-4 border-pink-300"
                  src={user.photoURL}
                  alt=""
                />
              </figure>
              <div className="ml-5 w-11/12">
                <p className="text-2xl font-bold">{user.displayName}</p>
                <p className="mt-5 text-xl">{doc.data().message}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Post;
