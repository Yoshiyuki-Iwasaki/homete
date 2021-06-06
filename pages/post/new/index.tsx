import React from 'react';
import styles from '../../../styles/post.module.scss';
import CommonMeta from '../../component/CommonMeta';
import Header from '../../component/Header';
import PostButton from '../../component/PostButton';

const User: React.FC = () => {
  return (
    <>
      <CommonMeta title="User" description="This is User page." />
      <Header />

      <main>
        <form action="" className={styles.form}>
          <input
            className={styles.input}
            type="text"
            // value={userInput}
            // onChange={handleChange}
            placeholder="みんなに褒めてもらいましょう(^^)"
          />
          <button className={styles.button}>投稿する</button>
        </form>
      </main>
      <PostButton />
    </>
  );
};

export default User;
