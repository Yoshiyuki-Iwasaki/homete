import React from 'react';
import PostList from '../components/PostList';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';
import Auth from '../components/Auth';

const Home = () => {
  return (
    <Layout>
      <main className="mt-32 md:w-9/12 p-3 mx-auto">
        {/* <Auth /> */}
        <PostInput />
        <PostList />
      </main>
    </Layout>
  );
};

export default Home;
