import React from 'react';
import Head from 'next/head';
import CommonMeta from './component/CommonMeta';
import Header from './component/Header';
import Post from './component/Post';
import PostInput from './component/PostInput';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />

      <main className={styles.main}>
        <PostInput />
        <Post />
      </main>
    </div>
  );
};

export default Home;
