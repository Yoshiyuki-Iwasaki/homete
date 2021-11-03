import Link from 'next/link';
import styled from 'styled-components';
import { COLORS } from '../../utils/variable';
import { UserType } from '../../declarations/User';

const UserProfile = ({ displayName, photoURL, uid }: UserType) => {

  return (
    <Main>
      <Icon>
        <IconImage src={photoURL} />
      </Icon>
      <UserName>{displayName}</UserName>
      <TextArea>
        <Link href={`/user/follow/${uid}`} as={`/user/follow/${uid}`} passHref>
          <TitleLink>フォロー</TitleLink>
        </Link>
        <Link href={`/user/follower/${uid}`} as={`/user/follower/${uid}`} passHref>
          <TitleLink>フォロワー</TitleLink>
        </Link>
      </TextArea>
    </Main>
  );
};

export default UserProfile;

const Main = styled.div`
  padding-top: 40px;
`;

const Icon = styled.figure`
  margin: 0 auto;
  width: 100px;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const IconImage = styled.img`
  border-radius: 150px;
  width: 100%;
`;

const UserName = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 22px;
  color: ${COLORS.WHITE};
  font-weight: 700;
`;
const TextArea = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const TitleLink = styled.a`
  font-size: 15px;
  color: ${COLORS.WHITE};
  font-weight: 700;

  &:first-child {
    margin-right: 10px;
  }
`;