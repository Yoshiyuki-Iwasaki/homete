import React from 'react';
import CommonMeta from '../components/CommonMeta';
import Header from '../components/Header';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <main className="mt-32 md:w-9/12 p-3 mx-auto">
        <PostInput />
        <PostList />
      </main>
    </Layout>
  );
};

export default Home;
