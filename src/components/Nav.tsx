import React from 'react'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/mypage">マイページ</a>
        </li>
        <li>
          <a>ログアウト</a>
        </li>
        <input data-testid="input" value="" type="text" onChange={() => console.log('test')} />
      </ul>
    </nav>
  );
}

export default Nav
