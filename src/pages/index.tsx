import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostList from '../components/post/PostList';
import PostInput from '../components/post/PostInput';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const Home = () => {
  const db = firebase.firestore();
  const [follows, setFollows] = useState('');
  const [followList, setFollowList] = useState('');
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    (async (): Promise<any> => {
      if (user) {
        await db
          .collection('follows')
          .where('following_uid', '==', user.uid)
          .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
            setFollows(snapshot.docs.map((doc: any) => doc.data().followed_uid));
          });
      }
    })();
  }, [user]);

  useEffect(() => {
    (async (): Promise<any> => {
      if (follows) {
        const reads = follows.map((id: number) =>
          db
            .collection('textList')
            .where('userId', 'in', [id, user.uid])
            .orderBy('createdAt', 'asc')
            .get(),
        );
        const result = await Promise.all(reads);
        result.map((v: any) => setFollowList(v));
      }
    })();
  }, [follows]);

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return (
    <Layout>
      <PostInput />
      <PostList list={followList} />
    </Layout>
  );
};

export default Home;
