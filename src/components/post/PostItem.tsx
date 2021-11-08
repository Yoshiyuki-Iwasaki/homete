import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Link from 'next/link';
import Reply from '../module/Reply';
import { COLORS } from '../../utils/variable';
import Loader from 'react-loader-spinner';
import { PostItemType } from '../../declarations/Post';
import { useToggle } from '../../hooks/useToggle';
import Like from '../module/Like';
import Modal from '../module/Modal';
import dayjs from 'dayjs';

const PostItem: React.FC<PostItemType> = ({
  uid,
  id,
  message,
  userId,
  createdAt,
  detail,
  reply,
}) => {
  const db = firebase.firestore();
  const [toggle, setToggle] = useToggle(false);
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  let dueDate;

  if (createdAt) {
    dueDate = dayjs.unix(createdAt.seconds).format('YYYY-MM-DD HH:mm');
  }

  const removePostData = async () => {
    const result = window.confirm('本当にこの投稿を削除しますか。');
    const postDocs = await db.collection('post').where('id', '==', id).get();
    if (result) {
      postDocs.docs.forEach((postDoc) => {
        db.collection('post').doc(postDoc.id).delete();
      });
    }
  };
  const openReplyField = () => {
    setToggle();
  };
  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <List key={id}>
      <Inner>
        <Wrap>
          <RemoveButton onClick={removePostData}>削除</RemoveButton>
          <Link href={`/post/${uid}`} as={`/post/${uid}`} passHref>
            <ListLink>
              <Icon>
                <IconImage src={value.data().photoURL} alt="" />
              </Icon>
              <TextArea>
                <Header>
                  <UserName>{value.data().displayName}</UserName>
                  {createdAt && <Date>{dueDate}</Date>}
                </Header>
                {reply && (
                  <ReplyText>
                    返信先:
                    <Link
                      href={`/user/${value.data().uid}`}
                      as={`/user/${value.data().uid}`}
                      passHref
                    >
                      <ReplyLink>@{value.data().uid}</ReplyLink>
                    </Link>
                  </ReplyText>
                )}
                <Text>{message}</Text>
              </TextArea>
            </ListLink>
          </Link>
          <Like postId={uid} />
          <ReplyButton onClick={openReplyField}>返信</ReplyButton>
          {toggle && <Modal openReplyField={openReplyField} value={value} id={uid} />}
        </Wrap>
        {detail && <Reply postId={uid} userData={value} />}
      </Inner>
    </List>
  );
};

export default PostItem;

const List = styled.li``;

const Inner = styled.div`
  position: relative;
`;

const Icon = styled.figure`
  width: 43px;

  @media (max-width: 768px) {
    width: 43px;
  }
`;

const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
`;
const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
const Header = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const UserName = styled.p`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
const Date = styled.p`
  margin-left: 15px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 500;

  @media (max-width: 768px) {
    margin-top: 5px;
    margin-left: 0;
    font-size: 14px;
  }
`;
const Text = styled.p`
  margin-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const ReplyText = styled.p`
  margin-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

const ReplyLink = styled.a`
  color: ${COLORS.WHITE};
  font-size: 12px;
`;

const Wrap = styled.div`
  position: relative;
`;

const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 14px;
  color: ${COLORS.WHITE};
`;

const ReplyButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 130px;
  display: flex;
  align-items: center;
  z-index: 10;
  font-size: 14px;
  color: ${COLORS.WHITE};

  @media (max-width: 768px) {
    bottom: -24px;
    left: 90px;
  }
`;

const ListLink = styled.a`
  padding: 20px 10px 50px;
  display: flex;
  width: 100%;
  cursor: pointer;
`;