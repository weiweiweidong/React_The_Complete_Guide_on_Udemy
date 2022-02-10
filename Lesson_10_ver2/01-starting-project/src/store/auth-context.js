import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext( {
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: ( email, password ) => { }
} );

export const AuthContextProvider = ( props ) =>
{
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect( () =>
    {
        // 读取浏览器的缓存数据
        const storedUserLoggedInInformation = localStorage.getItem( 'isLoggedIn' );
        // 当浏览器内缓存了登陆信息时，将 state 设为 true
        if ( storedUserLoggedInInformation === '1' )
        {
            setIsLoggedIn( true );
        }
    }, [] );

    const logoutHandler = () =>
    {
        localStorage.removeItem( 'isLoggedIn' );
        setIsLoggedIn( false );
    }
    const loginHandler = () =>
    {
        localStorage.setItem( 'isLoggedIn', '1' );
        setIsLoggedIn( true );
    }

    return <AuthContext.Provider
        value={ {
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        } }
    >
        { props.children }
    </AuthContext.Provider>
};

export default AuthContext;