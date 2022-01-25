import firebase from '../../firebase/clientApp';
import { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/variable';

type ModalType = {
  openReplyField: any;
  value: any;
  id: any;
};

const Modal: React.FC<ModalType> = ({ openReplyField, value, id }) => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    if (!text) return;
    await db.collection('reply').add({
      id: new Date().getTime(),
      message: text,
      userId: value.data().uid,
      postId: id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
    openReplyField;
  };

  return (
    <>
      <Main>
        <Title>返信はこちら</Title>
        <Form onSubmit={handleSubmit}>
          <StyledInput type="text" value={text} onChange={handleInput} />
        </Form>
      </Main>
      <Overlay onClick={openReplyField} />
    </>
  );
};

const Main = styled.div`
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(56, 68, 77);
  z-index: 30;
`;
const Title = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${COLORS.WHITE};
  font-weight: 700;
`;
const Form = styled.form`
  margin-top: 20px;
  text-align: center;
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

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
`;

export default Modal;
