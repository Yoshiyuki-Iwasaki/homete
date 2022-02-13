import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../../firebase/clientApp';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import { COLORS } from '../../../utils/variable';

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [searchText, setSearchText] = useState<string>('');
  const router = useRouter();

  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;

  const logout = () => {
    firebase.auth().signOut();
  };

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    if (!searchText) return;
    router.push(`/search?keyword=${searchText}`);
    setSearchText('');
  };

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <HeaderLayout>
        <Inner>
          <Title>
            <Link href="/" as="/">
              <TitleLink>Homete</TitleLink>
            </Link>
          </Title>

          <RightArea>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Label htmlFor="search">検索: </Label>
              <Input
                type="text"
                name="search"
                value={searchText}
                id="search"
                onChange={(e) => handleInput(e)}
              />
            </Form>
            {user && (
              <>
                <Hover>
                  <Wrapper>
                    <Link href={`/user/${user.uid}`} as={`/user/${user.uid}`}>
                      <UserName>{user.displayName}</UserName>
                    </Link>
                    <Icon>
                      <IconImage src={user.photoURL} alt="" />
                    </Icon>
                  </Wrapper>
                  <List>
                    <ListItem>
                      <Link href={`/user/${user.uid}`} as={`/user/${user.uid}`}>
                        <ListLink>プロフィールを見る</ListLink>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Button onClick={() => logout()}>ログアウト</Button>
                    </ListItem>
                  </List>
                </Hover>
              </>
            )}
          </RightArea>
        </Inner>
      </HeaderLayout>
    </>
  );
};

export default Header;

const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
  background: rgb(21, 32, 43);
  border-bottom: 1px solid rgb(56, 68, 77);
`;
const Inner = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1``;
const TitleLink = styled.a`
  font-size: 30px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Form = styled.form`
  margin-right: 30px;
`;
const Label = styled.label`
  margin-right: 10px;
  font-size: 13px;
  color: ${COLORS.WHITE};
`;
const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid gray;
`;
const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const UserName = styled.span`
  cursor: pointer;
  font-size: 15px;
  color: ${COLORS.WHITE};
  letter-spacing: 0.025em;
  font-weight: 700;
`;
const Hover = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.figure`
  margin-left: 10px;
  width: 40px;
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
const List = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  &:before {
    content: '';
    position: absolute;
    top: -4px;
    right: 25px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    background: gray;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  ${Hover}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
const ListItem = styled.li`
  background: gray;
`;
const ListLink = styled.a`
  padding: 15px 5px;
  display: inline-block;
  border-bottom: 1px solid ${COLORS.WHITE};
  width: 200px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;
const Button = styled.a`
  padding: 15px 5px;
  display: inline-block;
  cursor: pointer;
  width: 200px;
  font-size: 13px;
  color: ${COLORS.WHITE};
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;
