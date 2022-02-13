import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../../firebase/clientApp';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import {
  HeaderLayout,
  Inner,
  Title,
  TitleLink,
  RightArea,
  Form,
  Label,
  Input,
  Hover,
  Wrapper,
  UserName,
  Icon,
  IconImage,
  List,
  ListItem,
  Button,
  ListLink,
} from './style';

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
