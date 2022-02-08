import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext, { AuthContextProvider } from './Store/auth-context';


function App ()
{


  // // 设置登陆状态
  // const loginHandler = ( email, password ) =>
  // {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   // 用下面的语句，将登陆状态存储在缓存中
  //   localStorage.setItem( 'isLoggedIn', '1' );
  //   setIsLoggedIn( true );
  // };

  // // 设置登出状态
  // const logoutHandler = () =>
  // {
  //   localStorage.removeItem( 'isLoggedIn' );
  //   setIsLoggedIn( false );
  // };

  const ctx = useContext( AuthContext );

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={ ctx.isLoggedIn } onLogout={ ctx.logoutHandler } />
      <main>
        { !ctx.isLoggedIn && <Login /> }
        { ctx.isLoggedIn && <Home /> }
      </main>
    </React.Fragment>


  );
}

export default App;
