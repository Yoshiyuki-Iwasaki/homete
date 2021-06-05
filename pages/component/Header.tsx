import React from 'react';
import Head from 'next/head';
import styles from '../../styles/header.module.scss';

const Header: React.FC = () => {
  return (
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
