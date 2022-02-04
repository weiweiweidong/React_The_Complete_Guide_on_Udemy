import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) =>
{
    // 处理变化数据
    const dropdownChangeHandler = (event) =>
    {
        // 调用父方法
        props.onChangeFilter(event.target.value);
    };

    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                {/* 双向绑定数据；数值变化时，调用 dropdownChangeHandler 方法 */}
                <select value={props.selected} onChange={ dropdownChangeHandler }>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;