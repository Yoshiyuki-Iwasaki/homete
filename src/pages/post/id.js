import React from 'react';
import styles from '../../../styles/header.module.scss';
import Header from '../../components/Header';
import CommonMeta from '../../components/CommonMeta';
// import PostButton from '../../components/PostButton';

const User = () => {
  return (
    <>
      <CommonMeta title="User" description="This is User page." />
      <Header />

      <main className={styles.main}></main>

      {/* <PostButton /> */}
    </>
  );
};

export default User;
