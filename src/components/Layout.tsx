import React from 'react'
import CommonMeta from './meta';
import Auth from '../components/Auth';
import Header from '../components/Header';
import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const Layout = ({ children }: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }
  const Main = styled.main`
    margin: 20px auto 0;
    width: 1000px;
  `
  return (
    <>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />
      <Main>{!user ? <Auth /> : <>{children}</>}</Main>
    </>
  );
};

export default Layout
