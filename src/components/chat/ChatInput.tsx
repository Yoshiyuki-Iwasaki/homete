import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { pc, sp } from '../module/media';
import Loader from 'react-loader-spinner';
import { COLORS } from '../../utils/variable';
import { ChatInputType } from '../../declarations/Chat';

const ChatInput = ({ id }: ChatInputType) => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>('');
  const [user, loading, error] = useAuthState(firebase.auth());

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>,
  ): Promise<string> => {
    e.preventDefault();
    if (!text) return;
    await db.collection('chat').add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      groupeId: id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
  };

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Input
        data-testid="input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="みんなに褒めてもらいましょう(^^)"
      />
      <Button data-testid="createButton" onClick={(e) => handleSubmit(e)}>
        投稿する
      </Button>
    </Form>
  );
};

export default ChatInput;


const Form = styled.form`
  text-align: center;
`;
const Input = styled.input`
  width: calc(100% / 3);
  height: 200px;
  border: 1px solid gray;

  ${sp`
  width: 70%;
  height: 90px;
`}
`;
const Button = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: 1px solid gray;
  color: ${COLORS.WHITE};
  transition: all 0.6s;
  cursor: pointer;
`;