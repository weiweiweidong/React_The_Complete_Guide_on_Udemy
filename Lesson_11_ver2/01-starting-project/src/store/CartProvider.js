import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = ( state, action ) =>
{
    if ( action.type === 'ADD' )
    {
        // array.findIndex() 用于返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
        // 查找新添加的订单识是否在 state.items 里面存在
        const existingCartItemIndex = state.items.findIndex( item => item.id === action.item.id );
        // 如果存在，把该条订单抽出来
        const existingCartItem = state.items[ existingCartItemIndex ];

        let updatedItems;
        // 如果存在
        if ( existingCartItem )
        {
            // 重新计算该条订单的数量
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            // 拷贝 state.items 
            updatedItems = [ ...state.items ];
            // 把重新计算的订单更新进 items
            updatedItems[ existingCartItemIndex ] = updatedItem;
        } else
        {
            // 如果不存在，直接就把 action.item 追加进 state.items
            updatedItems = state.items.concat( action.item );
        }
        // 重新计算订单总金额
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        // 更新 state 状态
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    } else if ( action.type === 'REMOVE' )
    {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingItem = state.items[ existingCartItemIndex ];

        let updatedItems;
        if ( existingItem.amount === 1 )
        {
            // 剔除数量为1的订单，返回更新后的数组
            updatedItems = state.items.filter( item => item.id !== action.id );
        } else
        {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [ ...state.items ];
            updatedItems[ existingCartItemIndex ] = updatedItem;
        }
        // 重新计算订单总金额
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    return defaultCartState;
}

const CartProvider = ( props ) =>
{
    const [ cartSate, dispatchCartAction ] = useReducer( cartReducer, defaultCartState );

    const addItemToHandler = ( item ) =>
    {
        dispatchCartAction( {
            type: "ADD",
            item: item,
        } );
    };
    const removeItemFromHandler = ( id ) =>
    {
        dispatchCartAction( {
            type: "REMOVE",
            id: id
        } );
    };
    const cartContext = {
        items: cartSate.items,
        totalAmount: cartSate.totalAmount,
        addItem: addItemToHandler,
        removeItem: removeItemFromHandler,
    };
    return <CartContext.Provider value={ cartContext }>
        { props.children }
    </CartContext.Provider>
};

export default CartProvider;