import firebase from '../../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';
import { Form, StyledInput } from './style';

const PostInput: React.FC = () => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>('');
  const [user, loading, error] = useAuthState(firebase.auth());

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    if (!text) return;
    await db.collection('post').add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
  };

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput type="text" value={text} onChange={handleInput} />
    </Form>
  );
};

export default PostInput;
