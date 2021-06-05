import React from 'react';
import Head from 'next/head';
import Header from './component/Header';
import Footer from './component/Footer';
import PostInput from './component/PostInput';
import PostList from './component/PostList';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <PostInput />
        <PostList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
