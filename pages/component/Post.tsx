import React from 'react';
import { useState } from 'react';

import styles from '../../styles/post.module.scss';

const Post: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList([userInput, ...todoList]);
    setUserInput('');
  };
  return (
    <>
      <form action="" className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="みんなに褒めてもらいましょう(^^)"
        />
        <button className={styles.button} onClick={handleSubmit}>
          投稿する
        </button>
      </form>
      <ul className={styles.postList}>
        {todoList.length >= 1
          ? todoList.map((todo, index) => {
              return (
                <li key={index} className={styles.postList_Item}>
                  <a className={styles.postList_link} href="../post/id">
                    <figure className={styles.postList_img}>
                      <img src="./icon.png" alt="" />
                    </figure>
                    {todo}
                  </a>
                </li>
              );
            })
          : ''}
      </ul>
    </>
  );
};

export default Post;
