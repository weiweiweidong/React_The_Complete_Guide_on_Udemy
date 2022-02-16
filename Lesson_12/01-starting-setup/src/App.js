import React, { useState, useCallback } from 'react';

import './App.css';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

function App ()
{
  const [ showPagagraph, setShowParagraph ] = useState( false );
  const [ allowToggle, setAllowToggle ] = useState( false );

  console.log( 'APP RUNNING!' );

  const toggleParagraphHandler = useCallback( () =>
  {
    if ( allowToggle )
    {
      setShowParagraph( prevShowParagraph => !prevShowParagraph );
    }
  }, [ allowToggle ] );

  const allowToggleHandler = () =>
  {
    setAllowToggle( !allowToggle );
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={ showPagagraph } />
      <Button onClick={ allowToggleHandler }>Allow Toggling</Button>
      <Button onClick={ toggleParagraphHandler }>Show Paragraph!</Button>
    </div>
  );
}

export default App;
