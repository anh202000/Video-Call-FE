import React from 'react';

const MessageDisplayer = (props) => {
  return (
    <div className='message_displayer'>
      {console.log(props, 'props')}
      {props.message}
    </div>
  );
};

export default MessageDisplayer;
