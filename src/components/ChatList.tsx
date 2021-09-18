import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import ChatItem from './ChatItem';

const ChatList = ({ todo }) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db.collection('chat').where('groupeId', '==', todo.id).orderBy('id', 'asc'),
    {},
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    console.log(error)
    return null;
  }

  return (
    <>
      {data.docs.map((data, index) => (
        <ChatItem key={index} data={data} />
      ))}
    </>
  );
}

export default ChatList
