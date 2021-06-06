import React from 'react';
import styles from '../../styles/postButton.module.scss';

const PostButton = () => {
  return (
    <>
      <a className={styles.link} href="/post/new"></a>
    </>
  );
};

export default PostButton;
