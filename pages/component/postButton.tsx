import React from 'react';
import styles from '../../styles/postButton.module.scss';

const postButton: React.FC = () => {
  return (
    <>
      <a className={styles.link} href="/post/new"></a>
    </>
  );
};

export default postButton;
