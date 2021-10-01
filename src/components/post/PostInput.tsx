import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const Form = styled.form`
  text-align: center;
`;
const StyledInput = styled.input`
  width: 500px;
  height: 120px;
  border: 1px solid gray;

  @media (max-width: 768px) {
    width: 70%;
  }
`;

const PostInput = () => {
  const db = firebase.firestore();
  const [text, setText] = useState('');
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString('ja-JP').slice(0, -3);

    const handleInput = (e) => {
      setText(e.target.value);
    };

  const handleSubmit = async (e): Promise<any> => {
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
    <Form onSubmit={handleSubmit}>
      <StyledInput type="text" value={text} onChange={handleInput} />
    </Form>
  );
};

export default PostInput;
