import React from 'react'
import CommonMeta from '../components/CommonMeta';
import Header from '../components/Header';

const Layout = ({children}) => {
  return (
    <>
      <CommonMeta title="Top" description="This is Top page." />
      <Header />
      {children}
    </>
  );
}

export default Layout
