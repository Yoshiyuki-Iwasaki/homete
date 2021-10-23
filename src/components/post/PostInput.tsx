import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { COLORS } from '../utils/variable';

const PostInput = () => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>('');
  const [user, loading, error] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

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
      // createdAt: new Date(),
    });
    setText('');
  };

  if (loading) return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput type="text" value={text} onChange={handleInput} />
    </Form>
  );
};

const Form = styled.form`
  padding: 25px 0;
  text-align: center;
  border-bottom: 1px solid rgb(56, 68, 77);
`;
const StyledInput = styled.input`
  width: 500px;
  height: 120px;
  border: 1px solid gray;
  color: ${COLORS.WHITE};
  font-size: 14px;

  @media (max-width: 768px) {
    width: 90%;
    height: 100px;
  }
`;

export default PostInput;
