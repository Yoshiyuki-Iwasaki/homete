import React from 'react';
import Layout from '../../components/Layout';
import Auth from '../../components/Auth';
import PostDetail from '../../components/PostDetail';
import firebase from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const PostDetailPage = ({todo}) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return <Layout>{!user ? <Auth /> : <PostDetail todo={todo} />}</Layout>;
};

export default PostDetailPage;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection('textList').get();
  const paths = res.docs.map((todo) => `/post/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
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
