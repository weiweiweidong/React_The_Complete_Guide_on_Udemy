import React, { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';

import Input from '../../UI/Input';

const MealItemForm = ( props ) =>
{
    const [ amountIsValid, setAmountIsValid ] = useState( true );
    const amountInputRef = useRef()
    const submitHandler = ( event ) =>
    {
        event.preventDefault();

        // 获取输入值，注意，无论 input 的 type 是什么，此时获取的值都为一个字符串
        const enteredAmount = amountInputRef.current.value;
        // 使用 +变量 的方式，可以快速转化为 number 类型
        const enteredAmountNumber = +enteredAmount;

        if ( enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 )
        {
            setAmountIsValid( false );
            return;
        }
        props.onAddToCart( enteredAmountNumber );
    };
    return <form className={ classes.form } onSubmit={ submitHandler }>
        <Input
            ref={ amountInputRef }
            label="Amount"
            input={ {
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            } } />
        <button>Add</button>
        { !amountIsValid && <p>Please enter a valid amount (1~5).</p> }
    </form>
};

export default MealItemForm;