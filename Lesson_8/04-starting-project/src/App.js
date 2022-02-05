import React, { useState } from 'react';

import AddUser from './Components/Users/AddUser';
import UsersList from './Components/Users/UsersList';

function App ()
{
  const [ usersList, setUsersList ] = useState([{name:'dong',age:30,id:0.1}]);

  const addUserHandler = ( uName, uAge ) =>
  {
    setUsersList( ( prevUsersList ) =>
    {
      return [ ...prevUsersList, { name: uName, age: uAge ,id:Math.random().toString()} ];
    } );
  };

  return (
    <div>
      <AddUser onAddUser={ addUserHandler } />
      <UsersList users={ usersList } />
    </div>
  );
}

export default App;
