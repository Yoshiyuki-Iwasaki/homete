import React from 'react';
import Layout from '../../components/Layout';
import PostDetail from '../../components/post/PostDetail';
import firebase from '../../firebase/clientApp';

const PostDetailPage = ({ data, uid }: any) => {
  return (
    <Layout>
      <PostDetail
        uid={uid}
        id={data.id}
        message={data.message}
        userId={data.userId}
        createdAt={data.createdAt}
      />
    </Layout>
  );
};

export default PostDetailPage;

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const res = await db.collection('post').get();
  const paths = res.docs.map((data) => `/post/${data.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const db = firebase.firestore();
  const id = context.params.id;
  const res = await db.collection('post').get();
  const todos = res.docs.map((todo) => todo);
  const array = todos.find((todo) => todo.id == id);
  return {
    props: {
      data: JSON.parse(JSON.stringify(array.data())),
      uid: array.id,
    },
  };
};
