import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../../firebase/clientApp';
import ChatItem from '../../molecules/chatItem';
import Loader from 'react-loader-spinner';
import { ChatListType } from './type';

const ChatList: React.FC<ChatListType> = ({ id }) => {
  const db = firebase.firestore();
  const [data, loading, error] = useCollection(
    db.collection('chat').where('groupeId', '==', id).orderBy('id', 'asc'),
    {},
  );

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <>
      {data.docs.map((data, index) => (
        <ChatItem key={index} message={data.data().message} />
      ))}
    </>
  );
};

export default ChatList;
