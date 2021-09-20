import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Like from './Like';
import Link from 'next/link';

const PostItem = ({ id, message, userId, createdAt }: any) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return value.data() ? (
    <li className="p-5 z-0 relative" key={id}>
      <Link href={`/post/${id}`} as={`/post/${id}`}>
        <a className="flex w-full">
          <div className="w-1/12">
            <img
              src={value.data().photoURL}
              className="rounded-full w-full border-2 border-pink-300"
              alt=""
            />
          </div>
          <div className="ml-5 w-11/12">
            <p className="text-2xl font-bold">{value.data().displayName}</p>
            <p className="mt-2 text-xl">{message}</p>
          </div>
        </a>
      </Link>
      <Like postId={id} />
    </li>
  ) : (
    ''
  );
};

export default PostItem
