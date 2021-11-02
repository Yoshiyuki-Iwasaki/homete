import React from 'react';
import Layout from '../../components/module/Layout';
import PostDetail from '../../components/post/PostDetail';
import firebase from '../../firebase/clientApp';

const ReplyDetailPage = ({ todo }: any) => {
  return (
    <Layout>
      {/* <PostDetail id={todo.id} message={todo.message} userId={todo.userId} /> */}
    </Layout>
  );
};

export default ReplyDetailPage;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection('reply').get();
  const paths = res.docs.map((todo) => `/reply/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('reply').get();
  const todos = res.docs.map((todo) => todo.data());
  const array = todos.find((todo) => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
