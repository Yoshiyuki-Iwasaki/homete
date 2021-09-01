import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
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
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-100 mx-auto">
        <div className="md:w-9/12 p-3 text-right mx-auto flex items-center justify-between">
          <h1>
            <a className="text-3xl font-bold tracking-wide" href="/">
              Homete
            </a>
          </h1>

          <div className="flex items-center justify-between">
            {!user ? (
              <a className="text-1xl font-bold tracking-wide" href="#">
                ログイン
              </a>
            ) : (
              <>
                <button onClick={() => logout()} className="bg-gray-500 text-white font-medium p-4">
                  ログアウト
                </button>
                <p className="text-1xl font-bold tracking-wide">{user.displayName}</p>
                <figure className="w-16" onClick={toggle}>
                  <img src={user.photoURL} alt="" />
                </figure>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
