import React from 'react'
import Meta from './meta';
import Auth from '../components/Auth';
import Header from '../components/Header';
import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const Main = styled.main`
  background-color: rgb(21, 32, 43);
  min-height: calc(100vh - 70px);
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 600px;
  min-height: calc(100vh - 70px);
  border-right: 1px solid rgb(56, 68, 77);
  border-left: 1px solid rgb(56, 68, 77);
`;

const Layout = ({ children }: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  return (
    <>
      <Meta title="Top" description="This is Top page." />
      <Header />
      <Main>
        <Inner>{!user ? <Auth /> : <>{children}</>}</Inner>
      </Main>
    </>
  );
};

export default Layout
