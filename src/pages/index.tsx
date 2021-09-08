import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';
import Auth from '../components/Auth';
import { useCollection } from 'react-firebase-hooks/firestore';


const Home = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [list, listLoading, listError] = useCollection(
    db.collection('textList').orderBy('id', 'desc'),
    {},
  );
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
            <PostList list={list} />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Home;
