import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import SearchList from './SearchList';
import PostInput from '../post/PostInput';
import Loader from 'react-loader-spinner';

const Search = ({ router }) => {
  const db = firebase.firestore();

  const [data, loading, error] = useCollection(
    db
      .collection('post')
      .orderBy('message')
      .startAt(router)
      .endAt(router + '\uf8ff'),
    {},
  );

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;
  return (
    <>
      <PostInput />
      <SearchList list={data} />
    </>
  );
};

export default Search;