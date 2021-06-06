import React from 'react';
import Head from 'next/head';
import styles from '../../styles/header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header_logo}>homete</h1>
    </header>
  );
};

export default Header;
