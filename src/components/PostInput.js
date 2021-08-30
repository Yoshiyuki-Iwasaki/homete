import React from 'react'
import styles from '../../styles/PostInput.module.scss';

const PostInput = () => {
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}

export default PostInput
