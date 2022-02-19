import classes from './User.module.css';

// Functional Component
// const User = ( props ) => {
//   return <li className={ classes.user }>{ props.name }</li>;
// };

// Class-based Component
import { Component } from 'react';

class User extends Component {
  render () {
    return <li className={ classes.user }>{ this.props.name }</li>;
  }
}

export default User;
