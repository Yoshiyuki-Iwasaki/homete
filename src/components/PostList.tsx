import React from 'react';
import { useState } from 'react';

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
      <ul>
        <li>
          <a className="flex" href="../post/id">
            <figure className="w-1/12">
              <img
                className="rounded-full w-full border-4 border-pink-300"
                src="./icon.png"
                alt=""
              />
            </figure>
            <div className="ml-5 w-11/12">
              <p className="text-2xl font-bold">ユーザー名</p>
              <p className="mt-5 text-xl">
                テキストが入ります。テキストが入ります。テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。 テキストが入ります。 テキストが入ります。
                テキストが入ります。 テキストが入ります。
              </p>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Post;
