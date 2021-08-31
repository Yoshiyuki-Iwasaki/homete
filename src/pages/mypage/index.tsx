import React from 'react';
import Layout from '../../components/Layout';
import Post from '../../components/PostList';
// import PostButton from '../components/PostButton';

const Mypage = () => {
  return (
    <Layout>
      <main>
        <Post />
      </main>
    </Layout>
  );
};

export default Mypage;
