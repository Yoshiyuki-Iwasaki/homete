import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';

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
  return (
    <>
      <header className="w-full bg-gray-100 mx-auto">
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
                <a href={`/user/${user.uid}`} className="mr-5 text-1xl font-bold tracking-wide">
                  {user.displayName}
                </a>
                <div className="relative group">
                  <a className="w-16 block cursor-pointer">
                    <img className="border-2 bg-pink-300 rounded-full" src={user.photoURL} alt="" />
                  </a>
                  <div className="w-40 absolute invisible group-hover:visible bg-white border-2 border-light-blue-500">
                    <a className="px-1 py-3 block text-left font-medium" href={`/user/${user.uid}`}>
                      プロフィールを見る
                    </a>
                    <a
                      onClick={() => logout()}
                      className="px-1 py-3 block text-left bg-pink-300 text-white font-medium cursor-pointer"
                    >
                      ログアウト
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
