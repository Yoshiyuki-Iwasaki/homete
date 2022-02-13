import firebase from '../firebase/clientApp';
import PostList from '../components/organisms/postList';
import PostInput from '../components/atoms/postInput';
import Layout from '../components/templates/layout';
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
