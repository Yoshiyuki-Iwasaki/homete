import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';
import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const logout = () => {
    firebase.auth().signOut();
  };

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const Header = styled.header`
    margin: 0 auto;
    width: 100%;
    background: rgba(243, 244, 246, 0.5);
  `;
  const Inner = styled.div`
    margin: 0 auto;
    padding: 15px;
    max-width: 1000px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Title = styled.h1`
  `;
  const TitleLink = styled.a`
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
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
    color: gray;
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
    margin-right: 10px;
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
    border-bottom: 1px solid #fff;
    width: 200px;
    font-size: 13px;
    color: #fff;
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
    color: #fff;
    font-weight: 700;
    transition: opacity 0.6s;

    &:hover {
      opacity: 0.6;
    }
  `;

  return (
    <>
      <Header>
        <Inner>
          <Title>
            <Link href="/" as="/">
              <TitleLink>Homete</TitleLink>
            </Link>
          </Title>

          <RightArea>
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
      </Header>
    </>
  );
};

export default Header;
