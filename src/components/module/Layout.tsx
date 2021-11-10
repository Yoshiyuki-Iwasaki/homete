import React from 'react'
import Meta from '../meta';
import Auth from './Auth';
import Header from './Header';
import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Layout: React.FC<any> = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading)
    return <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={3000} />;
  if (error) return null;
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