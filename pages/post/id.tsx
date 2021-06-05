import React from 'react';
import styles from '../../styles/header.module.scss';
import Header from '../component/Header';
import Footer from '../component/Footer';

const User: React.FC = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>User</main>

      <Footer />
    </>
  );
};

export default User;
