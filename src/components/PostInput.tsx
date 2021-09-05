import firebase from '../../firebase/clientApp';
import { useState } from 'react';

const PostInput = () => {
  const db = firebase.firestore();
  const [text, setText] = useState('');
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await db.collection('textList').add({
      id: new Date().getTime(),
      message: text,
      userId: firebase.auth().currentUser.uid,
      createdAt: updatedTime,
    });
    setText('');
  };
  return (
    <div>
      <div>
        <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="w-80 h-20 border-4 border-light-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="みんなに褒めてもらいましょう(^^)"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="ml-10 px-5 py-3 bg-red-200 hover:opacity-70 transition-opacity cursor-pointer"
          >
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInput;
