import React, { useContext } from 'react';

import classes from './Navigation.module.css';

import AuthContext from '../../Store/auth-context';

const Navigation = () =>
{
  // 使用 useContext 接收从 App.js 传来的数据
  const ctx = useContext( AuthContext );

  return (
    <nav className={ classes.nav }>
      <ul>
        {/* 登陆状态时，显示 a 标签 */ }
        { ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        ) }
        { ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        ) }
        { ctx.isLoggedIn && (
          <li>
            <button onClick={ ctx.onLogout }>Logout</button>
          </li>
        ) }
      </ul>
    </nav>

  );
};

export default Navigation;
