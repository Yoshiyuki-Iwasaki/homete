import Link from 'next/link';
import styled from 'styled-components';
import Like from '../Like';
import Reply from '../Reply';

const IconImage = styled.img`
  width: 100%;
  border-radius: 50px;
  border: 1px solid gray;
`;
const TextArea = styled.div`
  padding-left: 10px;
  width: calc(100% - 100px);

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
const UserName = styled.p`
  font-size: 15px;
  color: #fff;
  font-weight: 700;

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    font-size: 14px;
  }
`;
const Text = styled.p`
  margin-top: 20px;
  color: #fff;
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const ReplyText = styled.p`
  margin-top: 10px;
  color: #fff;
  font-size: 12px;
`;

const ReplyLink = styled.a`
  color: #fff;
  font-size: 12px;
`;

interface Props {
  value: any;
  id: number;
  message: string;
  state: 'post'| 'reply';
}

const PostText: React.FC<Props> = ({ value, id, message, state }) => {

  const ListLink = styled.a`
    padding: 20px 10px 50px;
    position: relative;
    display: flex;
    width: 100%;
    ${({ state }) => (state == 'post' ? `border-top: 1px solid rgb(56, 68, 77);;` : '')}
    cursor: pointer;
  `;
  const Icon = styled.figure`
    width: 50px;

    @media (max-width: 768px) {
      width: 50px;
    }
  `;

  return (
    <Link href={`/post/${id}`} as={`/post/${id}`} passHref>
      <ListLink>
        <Icon>
          <IconImage src={value.data().photoURL} alt="" />
        </Icon>
        <TextArea>
          <UserName>{value.data().displayName}</UserName>
          {state === 'reply' && (
            <ReplyText>
              返信先:
              <Link href={`/user/${value.data().uid}`} as={`/user/${value.data().uid}`} passHref>
                <ReplyLink>@{value.data().uid}</ReplyLink>
              </Link>
            </ReplyText>
          )}
          <Text>{message}</Text>
        </TextArea>
        <Like postId={id} />
      </ListLink>
    </Link>
  );
};

export default PostText
