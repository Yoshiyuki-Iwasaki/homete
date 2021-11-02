import Search from '../../components/search/Search';
import Layout from '../../components/module/Layout';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  return (
    <Layout>
      <Search router={router.query.keyword} />
    </Layout>
  );
};

export default Home;
