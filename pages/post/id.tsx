import React from 'react';
import styles from '../../styles/header.module.scss';
import CommonMeta from '../component/CommonMeta';
import Footer from '../component/Footer';

const User: React.FC = () => {
  return (
    <>
      <CommonMeta title="User" description="This is User page." />

      <main className={styles.main}>User</main>

      <Footer />
    </>
  );
};

export default User;
