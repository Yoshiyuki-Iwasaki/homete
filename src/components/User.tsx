import { useState } from 'react';
import Follow from './Follow';
import PostList from './PostList';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';


const User = ({ todo }: any) => {
  const db = firebase.firestore();
  const [openTab, setOpenTab] = useState(1);
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [list, loading, error] = useCollection(
    db.collection('textList').where('userId', '==', todo.uid),
    {},
  );
  const [like, likeLoading, likeError] = useCollection(
    db.collection('likes').where('userId', '==', todo.uid),
    {},
  );
  if (loading || userLoading || likeLoading) {
    return <h6>Loading...</h6>;
  }
  if (error || userError || likeError) {
    return null;
  }
  const pomeranians = [];
  const likeList = like.forEach((doc) => doc.data().postId);
  console.log('likeList', likeList);
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
      <div className="mt-5 md:w-9/12 mx-auto">
        <div className="flex justify-center">
          <button
            className={`py-3 md:w-1/2 inline-block text-center text-lg ${
              openTab === 1 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
            }`}
            data-toggle="tab"
            role="tablist"
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
          >
            投稿
          </button>
          <button
            className={`ml-2 py-3 md:w-1/2 px-12 inline-block text-center text-lg ${
              openTab === 2 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
            }`}
            data-toggle="tab"
            role="tablist"
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
          >
            いいね
          </button>
          <button
            className={`ml-2 py-3 md:w-1/2 px-12 inline-block text-center text-lg ${
              openTab === 3 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
            }`}
            data-toggle="tab"
            role="tablist"
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
          >
            フォローフォロワー
          </button>
        </div>
        <ul>
          <li className={openTab === 1 ? 'block' : 'hidden'} id="link1">
            <PostList list={list} />
          </li>
          <li className={openTab === 2 ? 'block' : 'hidden'} id="link2">
            いいね投稿
          </li>
          <li className={openTab === 3 ? 'block' : 'hidden'} id="link2">
            フォローフォロワー
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User
