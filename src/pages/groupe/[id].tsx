import React from 'react';
import firebase from '../../firebase/clientApp';
import Layout from '../../components/templates/layout';
import ChatList from '../../components/organisms/chatList';
import ChatInput from '../../components/atoms/chatInput';

const GroupeDetail: React.FC<any> = ({ todo }: any) => {
  return (
    <Layout>
      <ChatList id={todo.id} />
      <ChatInput id={todo.id} />
    </Layout>
  );
};

export default GroupeDetail;

export const getStaticPaths = async (): Promise<any> => {
  const db = firebase.firestore();
  const res = await db.collection('groupe').get();
  const paths = res.docs.map((todo) => `/groupe/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context): Promise<any> => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('groupe').get();
  const todos = res.docs.map((todo) => todo.data());
  const array = todos.find((todo) => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
