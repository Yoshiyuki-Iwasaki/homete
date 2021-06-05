import React from 'react';
import Head from 'next/head';
import Header from './component/Header';
import Footer from './component/Footer';
import Post from './component/Post';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Post />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
