import React, { useState,useEffect } from 'react';

const AuthContext = React.createContext( {
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: ( email, password ) => { },
} );

export const AuthContextProvider = ( props ) =>
{
    // 定义 isLoggedIn 状态
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    // 程序载入时读取缓存，看是否登陆
    useEffect( () =>
    {
        const stroedUserLoggedInfomation = localStorage.getItem( 'isLoggedIn' );
        if ( stroedUserLoggedInfomation === '1' )
        {
            setIsLoggedIn( true );
        }
    }, [] );

    
    const logoutHandler = () =>
    {
        localStorage.removeItem( 'isLoggedIn' );
        setIsLoggedIn( false );
    };
    const loginHandler = () =>
    {
        localStorage.setItem( 'isLoggedIn', '1' );
        setIsLoggedIn( true );
    };
    return (
        <AuthContext.Provider
            value={ {
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            } }>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthContext;