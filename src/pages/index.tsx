import firebase from '../firebase/clientApp';
import PostList from '../components/post/PostList';
import PostInput from '../components/post/PostInput';
import Layout from '../components/module/Layout';
import Loader from 'react-loader-spinner';
import { useCollection } from 'react-firebase-hooks/firestore';

const Home: React.FC = () => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db.collection('post').orderBy('createdAt', 'desc'),
    {},
  );

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <Layout>
      <PostInput />
      <PostList list={data} />
    </Layout>
  );
};

export default Home;
