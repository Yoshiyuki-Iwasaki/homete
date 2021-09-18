import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';
import Auth from '../components/Auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';

const Home = () => {
  const db = firebase.firestore();
  const [follows, setFollows] = useState('');
  const [followList, setFollowList] = useState('');
  const [user, loading, error] = useAuthState(firebase.auth());
  const [list, listLoading, listError] = useCollection(
    db.collection('textList').orderBy('id', 'desc'),
    {},
  );

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

  if (loading || listLoading) {
    return <h6>Loading...</h6>;
  }
  if (error || listError) {
    return null;
  }
  return (
    <Layout>
      <main className="mt-32 md:w-9/12 p-3 mx-auto">
        {!user ? (
          <Auth />
        ) : (
          <>
            <PostInput />
            <PostList list={followList} />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Home;
