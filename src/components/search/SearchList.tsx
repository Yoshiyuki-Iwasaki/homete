import PostItem from '../post/PostItem';
import styled from 'styled-components';

const List = styled.ul`
`;

const SearchList = ({ list }: any) => {
  return (
    <>
      <List>
        {/* {list.docs.map((doc: any, index: number) => (
          <PostItem
            key={index}
            id={doc.data().id}
            message={doc.data().message}
            userId={doc.data().userId}
            detail={false}
          />
        ))} */}
      </List>
    </>
  );
};

export default SearchList;
