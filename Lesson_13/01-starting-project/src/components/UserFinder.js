import { Fragment, useState, useEffect, Component } from 'react';
import UsersContext from '../store/users-context';

import classes from './UserFinder.module.css';

import Users from './Users';
import ErrorBoundary from './ErrorBoundary';

// const DUMMY_USERS = [
//     { id: 'u1', name: 'Max' },
//     { id: 'u2', name: 'Manuel' },
//     { id: 'u3', name: 'Julie' },
// ];

// Functional Component
// const UserFinder = () => {
//     const [ filteredUsers, setFilteredUsers ] = useState( DUMMY_USERS );
//     const [ searchTerm, setSearchTerm ] = useState( '' );

//     useEffect( () => {
//         setFilteredUsers(
//             DUMMY_USERS.filter( ( user ) => user.name.includes( searchTerm ) )
//         );
//     }, [ searchTerm ] );

//     const searchChangeHandler = ( event ) => {
//         setSearchTerm( event.target.value );
//     };

//     return (
//         <Fragment>
//             <div className={ classes.finder }>
//                 <input type='search' onChange={ searchChangeHandler } />
//             </div>

//             <Users users={ filteredUsers } />
//         </Fragment>
//     );
// };

// Class-based Component
class UserFinder extends Component {
    static contextType = UsersContext;

    // constructor参数接受两个参数props,context
    // 可以获取到父组件传下来的的props,context,如果你想在constructor构造函数内部(注意是内部哦，在组件其他地方是可以直接接收的)使用props或context,则需要传入，并传入super对象。
    constructor () {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ""
        }
    };
    componentDidMount () {
        this.setState( { filteredUsers: this.context.users } );
    }

    // 当 state 变化时，会运行
    componentDidUpdate ( prevProps, prevState ) {
        if ( prevState.searchTerm !== this.state.searchTerm ) {
            this.setState( {
                filteredUsers: this.context.users.filter( ( user ) => user.name.includes( this.state.searchTerm ) )
            } );
        }
    };
    searchChangeHandler ( event ) {
        this.setState( { searchTerm: event.target.value } );
    };

    render () {
        return (
            <Fragment>
                <div className={ classes.finder }>
                    <input type='search' onChange={ this.searchChangeHandler.bind( this ) } />
                </div>
                <ErrorBoundary>
                    <Users users={ this.state.filteredUsers } />
                </ErrorBoundary>
            </Fragment>
        );
    }
}

export default UserFinder;