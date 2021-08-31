import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Post from '../../components/Post';
// import PostButton from '../components/PostButton';

const Mypage = () => {
  return (
    <Layout>
      <main>
        <Post />
      </main>
      {/* <PostButton /> */}
    </Layout>
  );
};

export default Mypage;
