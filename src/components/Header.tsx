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
                <button
                  onClick={() => logout()}
                  className="mr-3 bg-pink-300 text-white font-medium p-4"
                >
                  ログアウト
                </button>
                <a href={`/user/${user.uid}`} className="mr-3 text-1xl font-bold tracking-wide">
                  {user.displayName}
                </a>
                <a href={`/user/${user.uid}`} className="w-16" onClick={toggle}>
                  <img className="border-2 bg-pink-300 rounded-full" src={user.photoURL} alt="" />
                </a>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
