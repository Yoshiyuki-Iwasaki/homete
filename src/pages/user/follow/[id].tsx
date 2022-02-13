import React, { useState, useEffect } from 'react';
import Layout from '../../../components/templates/layout';
import firebase from '../../../firebase/clientApp';
import styled from 'styled-components';
import FollowList from '../../../components/organisms/followList';
import UserProfile from '../../../components/user/UserProfile';
import { COLORS } from '../../../utils/variable';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';

const Follow: React.FC = () => {
  const db = firebase.firestore();
  const [follower, setFollower] = useState<number[]>();
  const [follow, setFollow] = useState<number[]>();
  const [followList, setFollowList] = useState<number[]>();
  const [followerList, setFollowerList] = useState<number[]>();
  const [followTab, setFollowTab] = useState<number>(1);
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    (async (): Promise<any> => {
      if (follower) {
        const reads = follower.map((id: number) =>
          db.collection('users').where('uid', '==', id).get(),
        );
        const result = await Promise.all(reads);
        result.map((v: any) => setFollowerList(v));
      }
      if (follow) {
        const reads = follow.map((id: number) =>
          db.collection('users').where('uid', '==', id).get(),
        );
        const result = await Promise.all(reads);
        result.map((v: any) => setFollowList(v));
      }
    })();
  }, [follower, follow]);

  useEffect(() => {
    (async (): Promise<any> => {
      await db
        .collection('follows')
        .where('following_uid', '==', user.uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setFollower(snapshot.docs.map((doc) => doc.data().followed_uid));
        });

      await db
        .collection('follows')
        .where('followed_uid', '==', user.uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setFollow(snapshot.docs.map((doc) => doc.data().following_uid));
        });
    })();
  }, []);

  const FollowButton = styled.button`
    padding: 10px 0;
    width: 50%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    color: rgb(136, 153, 166);
    ${(props) => followTab === props.tab && `background: ${COLORS.WHITE}`};
  `;
  const FollowerListItem = styled.li`
    display: ${(props) => (followTab === props.tab ? 'block' : 'none')};
  `;

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <Layout>
      <UserProfile displayName={user.displayName} photoURL={user.photoURL} uid={user.uid} />
      <Inner>
        <FollowButton
          tab={1}
          data-toggle="tab"
          role="tablist"
          onClick={(e) => {
            e.preventDefault();
            setFollowTab(1);
          }}
        >
          フォロー
        </FollowButton>
        <FollowButton
          tab={2}
          data-toggle="tab"
          role="tablist"
          onClick={(e) => {
            e.preventDefault();
            setFollowTab(2);
          }}
        >
          フォロワー
        </FollowButton>
      </Inner>
      <FollowerList>
        <FollowerListItem tab={1}>
          <FollowList data={followList} />
        </FollowerListItem>
        <FollowerListItem tab={2}>
          <FollowList data={followerList} />
        </FollowerListItem>
      </FollowerList>
    </Layout>
  );
};

export default Follow;

export const getStaticPaths = async (): Promise<any> => {
  const db = firebase.firestore();
  const res = await db.collection('users').get();
  const paths = res.docs.map((todo) => `/user/follow/${todo.data().uid}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context): Promise<any> => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('users').get();
  const todos = res.docs.map((todo) => todo.data());
  const array = todos.find((todo) => todo.uid == id);
  return {
    props: {
      todo: array,
    },
  };
};

const Inner = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const FollowerList = styled.ul``;
