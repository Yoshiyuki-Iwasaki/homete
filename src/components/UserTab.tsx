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

  const Button = styled.button`
    padding: 10px 0;
    display: inline-block;
    text-align: center;
    width: 33.333%;
    font-size: 18px;
    color: ${(props) => (openTab === props.tab ? 'pink' : 'gray')};
    ${(props) => (openTab === props.tab && 'border-bottom: 3px solid pink;')};
  `;

  const List = styled.ul`
  `;
  const ListItem = styled.li`
    display: ${(props) => (openTab === props.tab ? 'block' : 'none')};
  `;
  const Inner = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
  `;
  const FollowButton = styled.button`
    padding: 10px 0;
    width: 50%;
    display: inline-block;
    text-align: center;
    font-size: 15px;
    color: ${(props) => (followTab === props.tab ? '#fff' : '#000')};
    ${(props) => followTab === props.tab && 'background: pink'};
  `;

    const FollowList = styled.ul``;
    const FollowListItem = styled.li`
      display: ${(props) => (followTab === props.tab ? 'block' : 'none')};
    `;

  return (
    <Wrapper>
      <UpperList>
        <Button
          tab={1}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(1);
          }}
        >
          投稿
        </Button>
        <Button
          tab={2}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(2);
          }}
        >
          いいね
        </Button>
        <Button
          tab={3}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(3);
          }}
        >
          フォローフォロワー
        </Button>
      </UpperList>
      <List>
        <ListItem tab={1}>
          <PostList list={list} />
        </ListItem>
        <ListItem tab={2}>
          <PostList list={likeList} />
        </ListItem>
        <ListItem tab={3}>
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
          <FollowList>
            <FollowListItem tab={1}>
              <UserList data={followList} />
            </FollowListItem>
            <FollowListItem tab={2}>
              <UserList data={followerList} />
            </FollowListItem>
          </FollowList>
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default UserTab
