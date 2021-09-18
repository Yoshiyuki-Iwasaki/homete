import { useState, useEffect, useCallback } from 'react';
import PostList from './PostList';
import UserList from './UserList';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

const UserTab = ({ todo }: any) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<any>();
  const [follower, setFollower] = useState<any>();
  const [follow, setFollow] = useState<any>();
  const [openTab, setOpenTab] = useState(1);
  const [likeList, setLikeList] = useState();
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const [followTab, setFollowTab] = useState(1);
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
  }, []);

  useEffect(() => {
    (async () => {
      if (likes) {
        const reads = likes.map((id) => db.collection('textList').where('id', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v: any) => setLikeList(v));
      }
      if (follower) {
        const reads = follower.map((id) => db.collection('users').where('uid', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v: any) => setFollowerList(v));
      }
      if (follow) {
        const reads = follow.map((id) => db.collection('users').where('uid', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v: any) => setFollowList(v));
      }
    })();
  }, [likes, follower, follow]);

  const handleClick = useCallback(
    (number: any) => {
      setOpenTab(number);
    },
    [openTab],
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const Wrapper = styled.div`
    margin: 20px auto 0;
    width: 1000px;
  `;

  const UpperList = styled.ul`
    display: flex;
    justify-content: center;
  `;

  return (
    <Wrapper>
      <UpperList>
        <button
          className={`py-3 md:w-1/2 inline-block text-center text-lg ${
            openTab === 1 ? 'text-pink-700 border-b-4 border-pink-700' : 'text-gray-200'
          }`}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(1);
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
          onClick={() => {
            handleClick(2);
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
          onClick={() => {
            handleClick(3);
          }}
        >
          フォローフォロワー
        </button>
      </UpperList>
      <ul>
        <li className={openTab === 1 ? 'block' : 'hidden'}>
          <PostList list={list} />
        </li>
        <li className={openTab === 2 ? 'block' : 'hidden'}>
          <PostList list={likeList} />
        </li>
        <li className={openTab === 3 ? 'block' : 'hidden'}>
          <div className="mt-10 flex justify-center">
            <button
              className={`py-3 md:w-1/2 inline-block text-center text-lg ${
                followTab === 1 ? 'bg-pink-700 text-white' : 'text-gray-200'
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
                followTab === 2 ? 'bg-pink-700 text-white' : 'text-gray-200'
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
    </Wrapper>
  );
};

export default UserTab
