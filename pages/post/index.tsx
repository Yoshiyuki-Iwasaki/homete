import React from 'react';
import styles from '../../styles/header.module.scss';
import CommonMeta from '../component/CommonMeta';

const User: React.FC = () => {
  return (
    <>
      <CommonMeta title="User" description="This is User page." />

      <main className={styles.main}>User</main>
    </>
  );
};

export default User;
