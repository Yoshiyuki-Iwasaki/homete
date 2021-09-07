import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostItem from './PostItem';

const Post = () => {
  const [todo, loading, error] = useCollection(
    firebase.firestore().collection('textList').orderBy('id', 'desc'),
    {},
  );
    if (loading) {
      return <h6>Loading...</h6>;
    }
    if (error) {
      return null;
    }
  return (
    <>
      <ul className="mt-10">
        {todo &&
          todo.docs.map((doc, index) => (
            <PostItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              createdAt={doc.data().createdAt}
            />
          ))}
      </ul>
    </>
  );
};

export default Post;
