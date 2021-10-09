import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import ChatItem from './ChatItem';

interface Props {
  id: number;
}

const ChatList = ({ id }: Props) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db.collection('chat').where('groupeId', '==', id).orderBy('id', 'asc'),
    {},
  );

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <>
      {data.docs.map((data, index) => (
        <ChatItem key={index} message={data.data().message} />
      ))}
    </>
  );
};

export default ChatList
