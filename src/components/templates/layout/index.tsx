import React from 'react';
import Meta from '../../templates/meta';
import Auth from '../../../pages/auth';
import Header from '../../organisms/header';
import firebase from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';
import { Main, Inner } from './style';

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

export default Layout;
