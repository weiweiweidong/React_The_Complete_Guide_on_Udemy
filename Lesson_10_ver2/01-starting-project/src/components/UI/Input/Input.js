import React, { useRef, useEffect, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef( ( props, ref ) =>
{
    const inputRef = useRef();

    // 焦点集中在当前输入框（激活当前输入框的输入状态）
    const activate = () =>
    {
        inputRef.current.focus();
    }

    useImperativeHandle( ref, () =>
    {
        return {
            focus: () => { inputRef.current.focus(); }
        };
    } );

    return (
        <div
            className={ `${ classes.control } ${ props.isValid === false ? classes.invalid : ''
                }` }
        >
            <label htmlFor={ props.id }>{ props.label }</label>
            <input
                ref={ inputRef }
                type={ props.type }
                id={ props.id }
                value={ props.value }
                onChange={ props.onChange }
                onBlur={ props.onBlur }
            />
        </div>
    );
} )

export default Input;