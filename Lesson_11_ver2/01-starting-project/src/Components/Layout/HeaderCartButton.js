import React, { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ( props ) =>
{
    const [ btnIsHighlighted, setBtnIsHighlighted ] = useState( false );
    const cartCtx = useContext( CartContext );

    const { items } = cartCtx;
    // reduce 为数组中的每个值执行一次 callback 函数。本例是一个计算数组累加值的 trick
    const numberOfCartItems = items.reduce( ( curNumber, item ) =>
    {
        return curNumber + item.amount;
    }, 0 );

    // 通过 useEffect 状态来 增减 按钮的 class 名，控制动画
    const btnClasses = `${ classes.button } ${ btnIsHighlighted ? classes.bump : '' }`;

    useEffect( () =>
    {
        if ( cartCtx.items.length === 0 )
        {
            return;
        }
        setBtnIsHighlighted( true );
        const timer = setTimeout( () =>
        {
            setBtnIsHighlighted( false );
        }, 300 );

        //clean function
        return () =>
        {
            clearTimeout( timer );
        };
    }, [ items ] );

    return (
        <button className={ btnClasses } onClick={ props.onClick }>
            <span className={ classes.icon }>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={ classes.badge }>{ numberOfCartItems }</span>
        </button>
    );
};

export default HeaderCartButton;