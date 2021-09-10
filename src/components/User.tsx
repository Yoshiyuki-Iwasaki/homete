import { useState, useEffect } from 'react';
import Follow from './Follow';
import PostList  from './PostList';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import UserList from './UserList';

const User = ({ todo }: any) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<any>();
  const [follower, setFollower] = useState<any>();
  const [follow, setFollow] = useState<any>();
  const [likeList, setLikeList] = useState();
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const [followTab, setFollowTab] = useState(1);
  const [openTab, setOpenTab] = useState(1);
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

        await db
          .collection('follows')
          .where('following_uid', '==', todo.uid)
          .onSnapshot((snapshot) => {
            setFollower(snapshot.docs.map((doc) => doc.data().followed_uid));
          });

        await db
          .collection('follows')
          .where('followed_uid', '==', todo.uid)
          .onSnapshot((snapshot) => {
            setFollow(snapshot.docs.map((doc) => doc.data().following_uid));
          });
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (likes) {
        const reads = likes.map((id) => db.collection('textList').where('id', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v) => setLikeList(v));
      }
      if (follower) {
        const reads = follower.map((id) => db.collection('users').where('uid', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v) => setFollowerList(v));
      }
      if (follow) {
        const reads = follow.map((id) => db.collection('users').where('uid', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v) => setFollowList(v));
      }
    })();
  }, [likes, follower, follow]);

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
            <PostList list={likeList} />
          </li>
          <li className={openTab === 3 ? 'block' : 'hidden'}>
            <div className="mt-5 flex justify-center">
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
              <li className={followTab === 1 ? 'block' : 'hidden'}>
                <UserList data={followList} />
              </li>
              <li className={followTab === 2 ? 'block' : 'hidden'}>
                <UserList data={followerList} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User
