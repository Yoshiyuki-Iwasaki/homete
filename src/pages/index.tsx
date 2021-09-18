import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const Home = () => {
  const db = firebase.firestore();
  const [follows, setFollows] = useState('');
  const [followList, setFollowList] = useState('');
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    (async () => {
      if (user) {
        await db
          .collection('follows')
          .where('following_uid', '==', user.uid)
          .onSnapshot((snapshot:any) => {
            setFollows(snapshot.docs.map((doc) => doc.data().followed_uid));
          });
      }
    })();
  }, [followList, user]);

  useEffect(() => {
    (async () => {
      if (follows) {
        const reads = follows.map((id) =>
          db.collection('textList').where('userId', '==', id).get(),
        );
        const result = await Promise.all(reads);
        result.map((v) => setFollowList(v));
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
