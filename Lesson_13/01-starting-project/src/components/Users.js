import { Component, useState } from 'react';
// 导入 User 组件
import User from './User';

import classes from './Users.module.css';

// 声明了 Data
// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];

// ----------------- Functional Component -----------------
// const Users = () => {
//   const [ showUsers, setShowUsers ] = useState( true );

//   const toggleUsersHandler = () => {
//     setShowUsers( ( curState ) => !curState );
//   };

//   const usersList = (
//     <ul>
//       { DUMMY_USERS.map( ( user ) => (
//         <User key={ user.id } name={ user.name } />
//       ) ) }
//     </ul>
//   );

//   return (
//     <div className={ classes.users }>
//       <button onClick={ toggleUsersHandler }>
//         { showUsers ? 'Hide' : 'Show' } Users
//       </button>
//       { showUsers && usersList }
//     </div>
//   );
// };

// ----------------- Class-based Component -----------------
class Users extends Component {
  constructor () {
    super();
    this.state = {
      showUsers: true,
      moreState: 'Test',
    };
  }

  someCodeWhichMightFail () {
    console.log( "Maybe something wrong!" );
  }

  componentDidUpdate () {
    try {
      this.someCodeWhichMightFail();
    } catch ( err ) {
      // handle error
    }
    // if ( this.props.users.length === 0 ) {
    //   throw new Error( 'No users provided!' );
    // }
  }

  toggleUsersHandler () {
    // this.state.showUsers = false;  // 这种写法错误！
    this.setState( ( curState ) => {
      return { showUsers: !curState.showUsers };
    } );
  }

  render () {
    const usersList = (
      <ul>
        { this.props.users.map( ( user ) => (
          <User key={ user.id } name={ user.name } />
        ) ) }
      </ul>
    );
    return (
      <div className={ classes.users }>
        <button onClick={ this.toggleUsersHandler.bind( this ) }>
          { this.state.showUsers ? 'Hide' : 'Show' } Users
        </button>
        { this.state.showUsers && usersList }
      </div>
    );
  }
};

export default Users;
