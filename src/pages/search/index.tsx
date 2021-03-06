import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import SearchList from '../../components/organisms/searchList';
import PostInput from '../../components/atoms/postInput';
import Loader from 'react-loader-spinner';
import Layout from '../../components/templates/layout';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const db = firebase.firestore();

  const [data, loading, error] = useCollection(
    db
      .collection('post')
      .orderBy('message')
      .startAt(router.query.keyword)
      .endAt(router.query.keyword + '\uf8ff'),
    {},
  );

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;
  return (
    <Layout>
      <PostInput />
      <SearchList list={data} />
    </Layout>
  );
};

export default Home;
