import React from 'react';
import styles from '../../styles/header.module.scss';
import Header from '../component/Header';
import CommonMeta from '../component/CommonMeta';
import PostButton from '../component/PostButton';

const User = () => {
  return (
    <>
      <CommonMeta title="User" description="This is User page." />
      <Header />

      <main className={styles.main}></main>

      <PostButton />
    </>
  );
};

export default User;
