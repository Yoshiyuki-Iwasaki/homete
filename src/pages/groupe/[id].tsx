import React from 'react'
import firebase from '../../../firebase/clientApp';
import Layout from '../../components/Layout';
import ChatList from '../../components/chat/ChatList';
import ChatInput from '../../components/chat/ChatInput';

const GroupeDetail = ({todo}) => {
  return (
    <Layout>
      <ChatList todo={todo} />
      <ChatInput todo={todo} />
    </Layout>
  );
}

export default GroupeDetail

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection('groupe').get();
  const paths = res.docs.map((todo) => `/groupe/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
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
