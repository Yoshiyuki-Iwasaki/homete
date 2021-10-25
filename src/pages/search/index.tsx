import firebase from '../../firebase/clientApp';
import { isBefore, formatISO } from 'date-fns';
import Search from '../../components/Search';
import Layout from '../../components/Layout';
import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
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
