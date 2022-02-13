import firebase from '../../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';
import { ChatInputType } from './type';
import { Form, Input, Button } from './style';

const ChatInput: React.FC<ChatInputType> = ({ id }) => {
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
