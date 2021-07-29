import React from 'react';
import { useState } from 'react';

import styles from '../../styles/post.module.scss';

const Post = () => {
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
      <ul className={styles.postList}>
        {/* {todoList.length >= 1
          ? todoList.map((todo, index) => {
              return (
                <li key={index} className={styles.postList_item}>
                  <a className={styles.postList_link} href="../post/id">
                    <figure className={styles.postList_img}>
                      <img src="./icon.png" alt="" />
                    </figure>
                    <div className={styles.postList_textArea}>
                      <p className={styles.postList_userName}>ユーザー名</p>
                      <p className={styles.postList_text}>{todo}</p>
                    </div>
                  </a>
                </li>
              );
            })
          : ''} */}

        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>
                テキストが入ります。テキストが入ります。テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。 テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。
              </p>
            </div>
          </a>
        </li>

        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>
                テキストが入ります。テキストが入ります。テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。 テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。
              </p>
            </div>
          </a>
        </li>
        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>
                テキストが入ります。テキストが入ります。テキストが入ります。 テキストが入ります。
              </p>
            </div>
          </a>
        </li>
        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>テキストが入ります。</p>
            </div>
          </a>
        </li>
        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>
                テキストが入ります。テキストが入ります。テキストが入ります。 テキストが入ります。
              </p>
            </div>
          </a>
        </li>
        <li className={styles.postList_item}>
          <a className={styles.postList_link} href="../post/id">
            <figure className={styles.postList_img}>
              <img src="./icon.png" alt="" />
            </figure>
            <div className={styles.postList_textArea}>
              <p className={styles.postList_userName}>ユーザー名</p>
              <p className={styles.postList_text}>テキストが入ります。</p>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Post;
