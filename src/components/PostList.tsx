import firebase from '../../firebase/clientApp';
import PostItem from './PostItem';



const Post = ({ list }:any) => {
  return (
    <>
      <ul className="mt-10">
        {list &&
          list.docs.map((doc, index) => (
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
