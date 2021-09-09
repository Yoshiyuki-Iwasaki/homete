import React from 'react';
import Layout from '../../components/Layout';
import PostList from '../../components/PostList';

const Mypage = () => {
  return (
    <Layout>
      <main>
        <PostList />
      </main>
    </Layout>
  );
};

export default Mypage;
