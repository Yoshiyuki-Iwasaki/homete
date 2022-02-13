import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../../firebase/clientApp';
import PostItem from '../postItem';
import Loader from 'react-loader-spinner';
import { ReplyType } from './type';

const Reply: React.FC<ReplyType> = ({ postId, userData }) => {
  const db = firebase.firestore();
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [data, loading, error] = useCollection(
    db.collection('reply').where('postId', '==', postId),
    {},
  );

  if (loading || userLoading) {
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  }

  if (error || userError) return;

  return (
    <>
      {data &&
        data.docs.map((data: any, index: number) => (
          <PostItem
            key={index}
            uid={data.id}
            id={data.data().id}
            message={data.data().message}
            userId={data.data().userId}
            createdAt={data.data().createdAt}
            detail={true}
            reply={true}
          />
        ))}
    </>
  );
};

export default Reply;
