import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../firebase/clientApp';
import styled from 'styled-components';
import PostText from './post/PostText';

const Wrapper = styled.div`
  padding: 20px 10px 50px;
`;

const Form = styled.form`
  padding: 25px 0;
  text-align: center;
  border-bottom: 1px solid rgb(56, 68, 77);
`;
const StyledInput = styled.input`
  width: 500px;
  height: 120px;
  border: 1px solid gray;

  @media (max-width: 768px) {
    width: 90%;
    height: 100px;
  }
`;

interface Props {
  postId: number;
  userData: any;
}

const Reply: React.FC<Props> = ({ postId, userData }) => {
  const db = firebase.firestore();
  const [text, setText] = useState('');
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [data, loading, error] = useCollection(
    db.collection('reply').where('postId', '==', postId),
    {},
  );

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    if (!text) return;
    await db.collection('reply').add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      postId: postId,
      // createdAt: new Date(),
    });
    setText('');
  };

  data && data.docs.map((data, index) => console.log('data', data));

  if (loading || userLoading) {
    return <h6>Loading...</h6>;
  }

  if (error || userError) return;

  return (
    <>
      {data &&
        data.docs.map((data, index) => (
          <PostText
            key={index}
            value={userData}
            id={data.data().id}
            message={data.data().message}
            state={'reply'}
          />
        ))}
      <Form onSubmit={handleSubmit}>
        <StyledInput type="text" value={text} onChange={handleInput} />
      </Form>
    </>
  );
};

export default Reply;
