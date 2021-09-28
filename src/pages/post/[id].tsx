import React from 'react';
import Layout from '../../components/Layout';
import PostDetail from '../../components/post/PostDetail';
import firebase from '../../firebase/clientApp';

const PostDetailPage = ({todo}:any) => {
  return (
    <Layout>
      <PostDetail todo={todo} />
    </Layout>
  );
};

export default PostDetailPage;

export const getStaticPaths = async (): Promise<any> => {
  const db = firebase.firestore();
  const res = await db.collection('textList').get();
  const paths = res.docs.map((todo) => `/post/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context): Promise<any> => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('textList').get();
  const todos = res.docs.map((todo) => todo.data());
  const array = todos.find((todo) => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
