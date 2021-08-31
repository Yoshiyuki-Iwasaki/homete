import React, { useState } from 'react';
import Head from 'next/head';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
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
            <a className="text-1xl font-bold tracking-wide" href="#">
              ログイン
            </a>
            <figure className="w-16" onClick={toggle}>
              <img src="/icon.png" alt="" />
            </figure>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
