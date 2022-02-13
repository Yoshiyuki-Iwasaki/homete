import firebase from '../../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import Reply from '../reply';
import Loader from 'react-loader-spinner';
import { PostItemType } from '../../../declarations/Post';
import { useToggle } from './hooks';
import Like from '../../atoms/like';
import Modal from '../../organisms/modal';
import dayjs from 'dayjs';
import {
  List,
  Inner,
  Wrap,
  RemoveButton,
  ListLink,
  Icon,
  IconImage,
  TextArea,
  Header,
  UserName,
  Date,
  ReplyText,
  ReplyLink,
  Text,
  ReplyButton,
} from './style';

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
          {detail && <ReplyButton onClick={openReplyField}>返信</ReplyButton>}
          {toggle && <Modal openReplyField={openReplyField} value={value} id={uid} />}
        </Wrap>
        {detail && <Reply postId={uid} userData={value} />}
      </Inner>
    </List>
  );
};

export default PostItem;
