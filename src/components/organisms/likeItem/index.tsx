import firebase from '../../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import Loader from 'react-loader-spinner';
import dayjs from 'dayjs';
import { LikeItemType } from '../../../declarations/Like';
import {
  List,
  Inner,
  Wrap,
  ListLink,
  Icon,
  IconImage,
  TextArea,
  Header,
  UserName,
  Date,
  Text,
} from './style';

const LikeItem: React.FC<LikeItemType> = ({ id, message, userId, createdAt }) => {
  const [value, loading, error] = useDocument(firebase.firestore().doc(`users/${userId}`));
  let dueDate;

  if (createdAt) {
    dueDate = dayjs.unix(createdAt.seconds).format('YYYY-MM-DD HH:mm');
  }
  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  return (
    <List key={id}>
      <Inner>
        <Wrap>
          <div>
            <ListLink>
              <Icon>
                <IconImage src={value.data().photoURL} alt="" />
              </Icon>
              <TextArea>
                <Header>
                  <UserName>{value.data().displayName}</UserName>
                  {createdAt && <Date>{dueDate}</Date>}
                </Header>
                <Text>{message}</Text>
              </TextArea>
            </ListLink>
          </div>
        </Wrap>
      </Inner>
    </List>
  );
};

export default LikeItem;
