import React from 'react';

const MyParagraph = ( props ) =>
{
    console.log( "MyParagraph output" );
    return <p>{ props.children }</p>;
};
w
export default MyParagraph;