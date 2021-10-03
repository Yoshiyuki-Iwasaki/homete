import React from 'react';
import Layout from '../../components/Layout';
import PostDetail from '../../components/post/PostDetail';
import firebase from '../../firebase/clientApp';

interface Props {
  message: string;
  userId: number;
}

const PostDetailPage = ({ todo }: Props) => {
  return (
    <Layout>
      <PostDetail id={todo.id} message={todo.message} userId={todo.userId} />
    </Layout>
  );
};

export default PostDetailPage;

export const getStaticPaths = async (): Promise<any> => {
  const db = firebase.firestore();
  const res = await db.collection('post').get();
  const paths = res.docs.map((todo) => `/post/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context): Promise<any> => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('post').get();
  const todos = res.docs.map((todo) => todo.data());
  const array = todos.find((todo) => todo.id == id);

  console.log('array', array);
  return {
    props: {
      todo: array,
    },
  };
};
