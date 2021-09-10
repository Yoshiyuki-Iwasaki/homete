import { useState, useEffect } from 'react';
import Follow from './Follow';
import PostList  from './PostList';
import PostItem from './PostItem';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';


const User = ({ todo }: any) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<any>();
  const [test, setTest] = useState();
  const [followTab, setFollowTab] = useState(1);
  const [openTab, setOpenTab] = useState(1);
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [list, loading, error] = useCollection(
    db.collection('textList').where('userId', '==', todo.uid),
    {},
  );

  useEffect(() => {
    (async () => {
      await db
        .collection('likes')
        .where('userId', '==', todo.uid)
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data().postId));
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (likes) {
        const reads = likes.map((id) =>
          db.collection('textList').where('id', '==', id).get(),
        );
        const result = await Promise.all(reads);
        result.map((v) => setTest(v));
      }
    })();
  }, likes);


  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  // if (loading || userLoading || likeLoading) {
  //   return <h6>Loading...</h6>;
  // }
  // if (error || userError || likeError) {
  //   return null;
  // }

  return (
    <div className="mt-32">
      <figure className="w-1/5 mx-auto">
        <img
          className="rounded-full w-full border-4 border-pink-300 border-opacity-25"
          src={todo.photoURL}
        />
      </figure>
      <h1 className="mt-3 text-center text-2xl font-bold">{todo.displayName}</h1>
      <Follow userInfo={todo} />
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
          <li className={openTab === 1 ? 'block' : 'hidden'}>
            <PostList list={list} />
          </li>
          <li className={openTab === 2 ? 'block' : 'hidden'}>
            <PostList list={test} />
          </li>
          <li className={openTab === 3 ? 'block' : 'hidden'}>
            <div className="flex justify-center">
              <button
                className={`py-3 md:w-1/2 inline-block text-center text-lg ${
                  followTab === 1 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
                }`}
                data-toggle="tab"
                role="tablist"
                onClick={(e) => {
                  e.preventDefault();
                  setFollowTab(1);
                }}
              >
                フォロー
              </button>
              <button
                className={`ml-2 py-3 md:w-1/2 px-12 inline-block text-center text-lg ${
                  followTab === 2 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
                }`}
                data-toggle="tab"
                role="tablist"
                onClick={(e) => {
                  e.preventDefault();
                  setFollowTab(2);
                }}
              >
                フォロワー
              </button>
            </div>
            <ul>
              <li className={followTab === 1 ? 'block' : 'hidden'}>フォロー</li>
              <li className={followTab === 2 ? 'block' : 'hidden'}>フォロワー</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User
