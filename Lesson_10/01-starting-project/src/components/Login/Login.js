import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';
import Input from '../UI/Input/Input';


// 这个函数可以定义在组件外，因为这个函数内没有任何需要和当前函数做数据交互的地方
// 本质上是根据 动作action 更新 状态state
const emailReducer = ( state, action ) =>
{
  // 当用户正在 input 输入的时候，返回对象
  if ( action.type === 'USER_INPUT' )
  {
    return { value: action.val, isValid: action.val.includes( '@' ) }
  }
  // 当用户输入完成，离开 input 的时候，触发的对象
  if ( action.type === 'INPUT_BLUR' )
  {
    return { value: state.value, isValid: state.value.includes( '@' ) };
  }
  return { value: '', isValid: false };
}

const passwordReducer = ( state, action ) =>
{

  if ( action.type === 'USER_INPUT' )
  {
    return { value: action.val, isValid: action.val.trim().length > 9 }
  }
  if ( action.type === 'INPUT_BLUR' )
  {
    return { value: state.value, isValid: state.value.trim().length > 9 };
  }
  return { value: '', isValid: false };
}


const Login = ( props ) =>
{

  // 定义各种 state
  // const [ enteredEmail, setEnteredEmail ] = useState( '' );
  // const [ emailIsValid, setEmailIsValid ] = useState();
  // const [ enteredPassword, setEnteredPassword ] = useState( '' );
  // const [ passwordIsValid, setPasswordIsValid ] = useState();
  const [ formIsValid, setFormIsValid ] = useState( false );

  // ------------------------- ⬇️下面代码仅用来测试 useEffect 效果 -------------------------
  useEffect( () =>
  {
    console.log( "EFFECT RUNNING!" );
    return () =>
    {
      console.log( "EFFECT CLEANUP!" );
    };
  }, [] );
  // ------------------------- ⬆️上面代码仅用来测试 useEffect 效果 -------------------------

  const [ emailState, dispatchEmail ] = useReducer( emailReducer, { value: '', isValid: null } );
  const [ passwordState, dispatchPassword ] = useReducer( passwordReducer, { value: '', isValid: null } );

  const authCtx = useContext( AuthContext );
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // 用于监控几个值的变化
  useEffect( () =>
  {
    const identifier = setTimeout( () =>
    {
      console.log( 'Checking form validity!' );
      // 判断 form 是否有效，并设定状态
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500 );

    return () =>
    {
      console.log( "CLEANUP!" );
      clearTimeout( identifier );
    };

  }, [ emailIsValid, passwordIsValid ] );

  // Input 输入内容改变的时候调用
  const emailChangeHandler = ( event ) =>
  {
    // 将自定义的对象传入 dispatchEmail 里面，emailReducer 函数的 action 能收到值
    dispatchEmail( { type: 'USER_INPUT', val: event.target.value } );

    // 获取 email 输入值
    // setEnteredEmail( event.target.value );
    setFormIsValid(
      event.target.value.includes( '@' ) && passwordState.isValid
    );

  };

  const passwordChangeHandler = ( event ) =>
  {
    // 获取 password 输入值
    // setEnteredPassword( event.target.value );

    dispatchPassword( { type: 'USER_INPUT', val: event.target.value } )

    // 判断 form 是否有效，并设定状态
    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  };

  // 用户离开 input 输入框的时候触发的函数
  // 判断 email 是否有效，并设定 email 状态为 true 或 false
  const validateEmailHandler = () =>
  {
    // 将自定义的对象传入 dispatchEmail 里面，emailReducer 函数的 action 能收到值
    dispatchEmail( { type: 'INPUT_BLUR' } );
    // setEmailIsValid( emailState.isValid );
  };

  // 判断 password 是否有效，并设定 password 状态为 true 或 false
  const validatePasswordHandler = () =>
  {
    // setPasswordIsValid( enteredPassword.trim().length > 6 );
    dispatchPassword( { type: 'INPUT_BLUR' } );
  };

  // 登陆
  const submitHandler = ( event ) =>
  {
    if ( formIsValid )
    {
      event.preventDefault();
    } else if ( !emailIsValid )
    {
      emailInputRef.current.focus();
    } else
    {
      passwordInputRef.current.focus();
    }

    authCtx.onLogin( emailState.value, passwordState.value );
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>
        {/* email 输入框 */ }
        {/* <div
          className={ `${ classes.control } ${ emailState.isValid === false ? classes.invalid : ''
            }` }
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={ emailState.value }
            onChange={ emailChangeHandler }
            // 用户离开 input 输入框的时候触发的函数
            onBlur={ validateEmailHandler }
          />
        </div> */}
        <Input
          ref={ emailInputRef }
          id="email"
          label="E-Mail"
          type="email"
          isValid={ emailIsValid }
          value={ emailState.value }
          onChange={ emailChangeHandler }
          onBlur={ validateEmailHandler }
        />
        {/* password 输入框 */ }
        {/* <div
          className={ `${ classes.control } ${ passwordState.isValid === false ? classes.invalid : ''
            }` }
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={ passwordState.value }
            onChange={ passwordChangeHandler }
            onBlur={ validatePasswordHandler }
          />
        </div> */}
        <Input
          ref={ passwordInputRef }
          id="password"
          label="Password"
          type="password"
          isValid={ passwordIsValid }
          value={ passwordState.value }
          onChange={ passwordChangeHandler }
          onBlur={ validatePasswordHandler }
        />
        {/* 提交按钮 */ }
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
