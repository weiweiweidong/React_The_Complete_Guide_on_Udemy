import React, {useState} from 'react'

import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = ( props ) =>
{
    // title 是一个指针，指向传入的 props.title， setTitle 是一个函数，用于更新数据
    // 可以把它理解为 将 props.title 赋值给 title，在需要更新 title 值的时候，调用 setTitle() 方法把新的值传进去
    const [title, setTitle] = useState(props.title);
    console.log("这段代码会被执行");

    const clickHandler = () =>
    {
        // 更新 title 的值
        setTitle('Updated!');
        console.log("Clicked!!!");
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={ props.date } />
            <div className="expense-item__description">
                <h2>{ title }</h2>
                <div className="expense-item__price">${ props.amount }</div>
            </div>
            <button onClick={ clickHandler } >Change Title</button>
        </Card>
    );
}
export default ExpenseItem;