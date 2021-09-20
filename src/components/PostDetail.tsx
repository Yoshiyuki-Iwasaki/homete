import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

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
        <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
          <a>
            <img
              src={value.data().photoURL}
              className="rounded-full w-full border-2 border-pink-300"
              alt=""
            />
          </a>
        </Link>
        <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`}>
          <a>
            <p className="ml-3">{value.data().displayName}</p>
          </a>
        </Link>
      </div>
      <p className="mt-5">{todo.message}</p>
    </div>
  );
};

export default PostDetail;
