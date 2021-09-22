import firebase from '../../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const ChatInput = ({todo}:any) => {
  const db = firebase.firestore();
  const [text, setText] = useState('');
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await db.collection('chat').add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      groupeId: todo.id,
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

  const Form = styled.form`
    text-align: center;
  `
  const Input = styled.input`
    width: calc(100%/3);
    height: 200px;
    border: 1px solid gray;
  `
  const Button = styled.button`
    margin-left: 20px;
    padding: 5px 10px;
    border: 1px solid gray;
    color: #fff;
    transition: all 0.6s;
    cursor: pointer;
  `;

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="みんなに褒めてもらいましょう(^^)"
      />
      <Button onClick={(e) => handleSubmit(e)}>投稿する</Button>
    </Form>
  );
};

export default ChatInput;
