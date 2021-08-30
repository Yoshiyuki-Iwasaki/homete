import React from 'react';
import Head from 'next/head';
import CommonMeta from '../../components/CommonMeta';
import Header from '../../components/Header';
import Post from '../../components/Post';
// import PostButton from '../components/PostButton';

const Mypage = () => {
  return (
    <div>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />

      <main>
        <Post />
      </main>

      {/* <PostButton /> */}
    </div>
  );
};

export default Mypage;
