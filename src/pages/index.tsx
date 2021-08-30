import React from 'react';
import Head from 'next/head';
import CommonMeta from '../components/CommonMeta';
import Header from '../components/Header';
import Post from '../components/Post';
import PostInput from '../components/PostInput';

const Home = () => {
  return (
    <div>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />

      <main>
        <PostInput />
        <Post />
      </main>
    </div>
  );
};

export default Home;
