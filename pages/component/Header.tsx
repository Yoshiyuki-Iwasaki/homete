import React from 'react';
import Head from 'next/head';
import styles from '../../styles/header.module.scss';

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header_logo}>
          <a href="/" className={styles.header_link}>
            homete
          </a>
        </h1>
        {/* <a href="#" className={styles.header_loginButton}>
          ログイン
        </a> */}
        <div className={styles.hamburger}>
          <span className={styles.hamburger_item}></span>
          <span className={styles.hamburger_item}></span>
          <span className={styles.hamburger_item}></span>
        </div>
      </header>
    </>
  );
};

export default Header;
