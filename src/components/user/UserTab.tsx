import { useState, useEffect, useCallback } from 'react';
import UserList from '../organisms/userList';
import firebase from '../../firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { COLORS } from '../../utils/variable';
import { UserTabType } from '../../declarations/User';
import LikeItem from '../organisms/likeItem';

const UserTab: React.FC<UserTabType> = ({ uid }) => {
  const db = firebase.firestore();
  const [likes, setLikes] = useState<number[]>();
  const [openTab, setOpenTab] = useState<number>(1);
  const [likeList, setLikeList] = useState([]);
  const [list, loading, error] = useCollection(
    db.collection('post').where('userId', '==', uid),
    {},
  );

  useEffect(() => {
    (async (): Promise<any> => {
      await db
        .collection('likes')
        .where('userId', '==', uid)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data().postId));
        });
    })();
  }, []);

  useEffect(() => {
    (async (): Promise<any> => {
      if (likes) {
        const reads = likes.map((id: number) => db.collection('post').where('id', '==', id).get());
        const result = await Promise.all(reads);
        result.map((v: any) => v.docs.map((doc) => setLikeList((prev) => [...prev, doc.data()])));
      }
    })();
  }, [likes]);

  const handleClick = useCallback(
    (number: number) => {
      setOpenTab(number);
    },
    [openTab],
  );

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  const Button = styled.button`
    padding: 10px 0;
    display: inline-block;
    text-align: center;
    width: 33.333%;
    cursor: pointer;
    font-size: 15px;
    color: ${(props) => (openTab === props.tab ? `${COLORS.WHITE}` : 'rgb(136, 153, 166)')};
    ${(props) => openTab === props.tab && `border-bottom: 3px solid ${COLORS.WHITE};`};

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `;

  const ListItem = styled.li`
    display: ${(props) => (openTab === props.tab ? 'block' : 'none')};
  `;

  return (
    <Wrapper>
      <UpperList>
        <Button
          tab={1}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(1);
          }}
        >
          投稿
        </Button>
        <Button
          tab={2}
          data-toggle="tab"
          role="tablist"
          onClick={() => {
            handleClick(2);
          }}
        >
          いいね
        </Button>
      </UpperList>
      <List>
        <ListItem tab={1}>
          <UserList list={list} />
        </ListItem>
        <ListItem tab={2}>
          {likeList &&
            likeList.map((doc: any, index: number) => (
              <LikeItem
                key={index}
                id={doc.id}
                message={doc.message}
                userId={doc.userId}
                createdAt={doc.createdAt}
              />
            ))}
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default UserTab;

const Wrapper = styled.div`
  margin: 20px auto 0;
  max-width: 600px;
`;

const UpperList = styled.ul`
  display: flex;
  justify-content: center;
`;

const List = styled.ul``;
