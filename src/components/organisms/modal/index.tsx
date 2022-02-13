import firebase from '../../../firebase/clientApp';
import { useState } from 'react';
import { Main, Title, Form, StyledInput, Overlay } from './style';

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

export default Modal;
