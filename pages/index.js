import React from 'react';
import Head from 'next/head';
import CommonMeta from './component/CommonMeta';
import Header from './component/Header';
import Post from './component/Post';
import styles from '../styles/Home.module.scss';
import PostButton from './component/PostButton';

const Home = () => {
  return (
    <div className={styles.container}>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />

      <main className={styles.main}>
        <Post />
      </main>

      <PostButton />
    </div>
  );
};

export default Home;
