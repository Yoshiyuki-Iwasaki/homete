import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';
import Auth from '../components/Auth';

const Home = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
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
            <PostList />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Home;
