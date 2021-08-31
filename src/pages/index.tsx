import React from 'react';
import CommonMeta from '../components/CommonMeta';
import Header from '../components/Header';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <main>
        <PostInput />
        <Post />
      </main>
    </Layout>
  );
};

export default Home;
