import React from 'react'
import CommonMeta from '../components/CommonMeta';
import Auth from '../components/Auth';
import Header from '../components/Header';
import firebase from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

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
      <CommonMeta title="Top" description="This is Top page." />
      <Header />
      <main className="md:w-9/12 p-3 mx-auto">{!user ? <Auth /> : <>{children}</>}</main>
    </>
  );
};

export default Layout
