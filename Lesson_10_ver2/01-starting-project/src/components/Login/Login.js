import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

// 本 function 可以定义在组件外面。
const emailReducer = ( state, action ) =>
{
  if ( action.type === 'USER_INPUT' )
  {
    return { value: action.val, isValid: action.val.includes( '@' ) };
  }
  if ( action.type === 'INPUT_BLUR' )
  {
    return { value: state.value, isValid: state.value.includes( '@' ) };
  }
  return { value: '', isValid: false };
}
const passwordreducer = ( state, action ) =>
{
  if ( action.type === 'USER_INPUT' )
  {
    return { value: action.val, isValid: action.val.trim().length > 10 };
  }
  if ( action.type === 'INPUT_BLUR' )
  {
    return { value: state.value, isValid: state.value.trim().length > 10 };
  }
  return { value: '', isValid: false };
}


const Login = ( props ) =>
{
  // const [ enteredEmail, setEnteredEmail ] = useState( '' );
  // const [ emailIsValid, setEmailIsValid ] = useState();
  // const [ enteredPassword, setEnteredPassword ] = useState( '' );
  // const [ passwordIsValid, setPasswordIsValid ] = useState();
  const [ formIsValid, setFormIsValid ] = useState( false );

  const authCtx = useContext( AuthContext );

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // -------------------- 以下代码仅用于测试 useEffect 效果 --------------------
  // useEffect( () =>
  // {
  //   console.log( 'EFFECT RUNNING!' );
  //   return () =>
  //   {
  //     console.log( 'EFFECT CLEANUP!' );
  //   };
  // }, [ enteredPassword ] );
  // -------------------- 以下代码仅用于测试 useEffect 效果 --------------------

  // 声明 useReducer
  const [ emailState, dispatchEmail ] = useReducer( emailReducer, { value: '', isValid: null } );
  const [ passwordState, dispatchPassword ] = useReducer( passwordreducer, { value: '', isValid: null } );
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect( () =>
  {
    console.log( "Step 1 : Checking form validity!" );
    const identifier = setTimeout( () =>
    {
      // 判断输入值是否有效，并设定 state
      setFormIsValid( emailIsValid && passwordIsValid );
      console.log( "Step 2 : key Presseed" );
    }, 500 );

    return () =>
    {
      console.log( 'Step 3 :CLEAN UP' );
      clearTimeout( identifier );
    };
  }, [ emailIsValid, passwordIsValid ] );

  const emailChangeHandler = ( event ) =>
  {
    dispatchEmail( { type: 'USER_INPUT', val: event.target.value } );

    setFormIsValid(
      event.target.value.includes( '@' ) && passwordState.isValid
    );
  };

  const passwordChangeHandler = ( event ) =>
  {
    dispatchPassword( { type: 'USER_INPUT', val: event.target.value } )
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () =>
  {
    dispatchEmail( { type: 'INPUT_BLUR', } )
  };

  const validatePasswordHandler = () =>
  {
    dispatchPassword( { type: 'INPUT_BLUR' } )
  };

  const submitHandler = ( event ) =>
  {
    event.preventDefault();
    if ( formIsValid )
    {
      authCtx.onLogin( emailState.value, passwordState.value );
    } else if ( !emailIsValid )
    {
      // 当 email 输入错误时，自动 focus 到 email 的输入框里面
      emailInputRef.current.focus();
    } else
    {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>
        <Input
          ref={ emailInputRef }
          id='email'
          label='E-mail'
          type='email'
          isValid={ emailIsValid }
          value={ emailState.value }
          onChange={ emailChangeHandler }
          onBlur={ validateEmailHandler }
        />
        <Input
          ref={ passwordInputRef }
          id='password'
          label='Password'
          type='password'
          isValid={ passwordIsValid }
          value={ passwordState.value }
          onChange={ passwordChangeHandler }
          onBlur={ validatePasswordHandler }
        />
        <div className={ classes.actions }>
          <Button type="submit" className={ classes.btn } disabled={ !formIsValid }>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
