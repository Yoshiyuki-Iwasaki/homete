import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { pc, sp } from '../media';

interface Props {
  id:number;
}

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
  color: #fff;
  transition: all 0.6s;
  cursor: pointer;
`;

const ChatInput = ({ id }: Props) => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>('');
  const [user, loading, error] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

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
      createdAt: updatedTime,
    });
    setText('');
  };

  if (loading) return <h6>Loading...</h6>;
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
