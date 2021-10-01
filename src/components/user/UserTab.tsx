import { useState, useEffect, useCallback } from 'react';
import PostList from '../post/PostList';
import UserList from './UserList';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

interface Props {
  uid: string;
}

const Wrapper = styled.div`
  margin: 20px auto 0;
  max-width: 1000px;
`;

const UpperList = styled.ul`
  display: flex;
  justify-content: center;
`;

const List = styled.ul``;

const Inner = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const FollowList = styled.ul``;

const UserTab = ({ uid }: Props) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<number[]>();
  const [follower, setFollower] = useState<number>();
  const [follow, setFollow] = useState<number>();
  const [openTab, setOpenTab] = useState<number>(1);
  const [likeList, setLikeList] = useState<number[]>();
  const [followList, setFollowList] = useState<number[]>();
  const [followerList, setFollowerList] = useState<number[]>();
  const [followTab, setFollowTab] = useState<number>(1);
  const [list, loading, error] = useCollection(
    db.collection('textList').where('userId', '==', uid),
    {},
  );

  useEffect(() => {
    (async (): Promise<any> => {
      await db
        .collection('likes')
        .where('userId', '==', uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data().postId));
        });

      await db
        .collection('follows')
        .where('following_uid', '==', uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setFollower(snapshot.docs.map((doc) => doc.data().followed_uid));
        });

      await db
        .collection('follows')
        .where('followed_uid', '==', uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setFollow(snapshot.docs.map((doc) => doc.data().following_uid));
        });
    })();
  }, []);

  useEffect(() => {
    (async (): Promise<any> => {
      if (likes) {
        const reads = likes.map((id: number) =>
          db.collection('textList').where('id', '==', id).get(),
        );
        const result = await Promise.all(reads);
        result.map((v: any) => setLikeList(v));
      }
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
  }, [likes, follower, follow]);

  const handleClick = useCallback(
    (number: number) => {
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

  const Button = styled.button`
    padding: 10px 0;
    display: inline-block;
    text-align: center;
    width: 33.333%;
    cursor: pointer;
    font-size: 18px;
    color: ${(props) => (openTab === props.tab ? 'pink' : 'gray')};
    ${(props) => openTab === props.tab && 'border-bottom: 3px solid pink;'};

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `;

  const ListItem = styled.li`
    display: ${(props) => (openTab === props.tab ? 'block' : 'none')};
  `;
  const FollowButton = styled.button`
    padding: 10px 0;
    width: 50%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    color: ${(props) => (followTab === props.tab ? '#fff' : '#000')};
    ${(props) => followTab === props.tab && 'background: pink'};
  `;
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
