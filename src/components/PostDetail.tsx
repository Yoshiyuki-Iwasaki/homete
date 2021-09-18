import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';

const PostDetail = ({ todo }) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${todo.userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <div className="mt-10 md:w-9/12 p-3 mx-auto">
      <div className="flex items-center">
        <a href={`/user/${value.data().uid}`}>
          <img
            src={value.data().photoURL}
            className="rounded-full w-full border-2 border-pink-300"
            alt=""
          />
        </a>
        <a href={`/user/${value.data().uid}`}>
          <p className="ml-3">{value.data().displayName}</p>
        </a>
      </div>
      <p className="mt-5">{todo.message}</p>
    </div>
  );
};

export default PostDetail;
