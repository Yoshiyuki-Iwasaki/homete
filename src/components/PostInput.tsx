import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const PostInput = () => {
  const db = firebase.firestore();
  const [text, setText] = useState('');
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!text) return;
    await db.collection('textList').add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    });
    setText('');
  };
  if (userLoading) {
    return <h6>Loading...</h6>;
  }
  if (userError) {
    return null;
  }
  return (
    <div>
      <div>
        <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="w-3/5 h-40 border-4 border-light-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="みんなに褒めてもらいましょう(^^)"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="ml-10 px-5 py-3 bg-pink-300 text-white hover:opacity-70 transition-opacity cursor-pointer"
          >
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInput;
