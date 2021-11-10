import firebase from '../../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { COLORS } from '../../utils/variable';
import Loader from 'react-loader-spinner';
import dayjs from 'dayjs';

const LikeItem: React.FC<any> = ({
  id,
  message,
  userId,
  createdAt,
}) => {
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

const Wrap = styled.div`
  position: relative;
`;

const ListLink = styled.a`
  padding: 20px 10px 50px;
  display: flex;
  width: 100%;
  cursor: pointer;
`;