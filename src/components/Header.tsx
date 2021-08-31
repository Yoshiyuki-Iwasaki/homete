import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/header.module.scss';
import styled from 'styled-components';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header_logo}>
          <a href="/" className={styles.header_link}>
            Homete
          </a>
        </h1>
        <a href="#" className={styles.header_loginButton}>
          ログイン
        </a>
        <figure className={styles.icon} onClick={toggle}>
          <img src="/icon.png" alt="" />
        </figure>
      </header>
      <Nav open={open} onClick={toggle}>
        <Hamburger>
          <Hamburger_list></Hamburger_list>
          <Hamburger_list></Hamburger_list>
        </Hamburger>
        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <Nav_text>ログアウト</Nav_text>
            <Nav_text href="/mypage">マイページ</Nav_text>
          </li>
        </ul>
      </Nav>
    </>
  );
};

export default Header;

const Nav = styled.nav`
  padding: 70px 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #fff0f5;
  width: 150px;
  box-sizing: border-box;
  transition: all 0.4s ease-in-out;
  transform: translateX(${(props) => (props.open ? '0' : '-150px')});
`;

const Nav_text = styled.a`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  font-weight: 700;
  display: block;

  &:first-child {
    margin-top: 0;
  }
`;

const Hamburger = styled.ul`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Hamburger_list = styled.li`
  width: 100%;
  height: 3px;
  background: #666;

  &:nth-child(1) {
    transform: translate(0, 3px) rotate(45deg);
  }
  &:nth-child(2) {
    transform: rotate(-45deg);
  }
`;
