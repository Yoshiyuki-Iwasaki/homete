import firebase from '../firebase/clientApp';
import { isBefore, formatISO } from 'date-fns';
import PostList from '../components/post/PostList';
import PostInput from '../components/post/PostInput';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const Home = () => {
  const db = firebase.firestore();
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    db.collection('post').onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        id: doc.data().id,
        message: doc.data().message,
        userId: doc.data().userId,
        // createdAt: doc.data().createdAt.toDate(),
      }));
      setFollowList(data);
    });
  }, []);

  const sortedTodos = followList.sort((a, b) => (isBefore(a.createdAt, b.createdAt) ? 1 : -1));

  return (
    <Layout>
      <PostInput />
      <PostList list={followList} />
    </Layout>
  );
};

export default Home;
