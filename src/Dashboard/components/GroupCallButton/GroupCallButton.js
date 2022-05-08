import React from 'react';

import './GroupCallButton.css';
import { MdVideoCall } from 'react-icons/md';

const GroupCallButton = ({ onClickHandler, label }) => {
  return (
    <button onClick={onClickHandler} className='group_call_button'>
      <span style={{verticalAlign: 'middle',}}>{label}</span>
      <MdVideoCall style={{
        width: '20px',
        height: '20px',
        marginLeft: '4px',
        verticalAlign: 'middle',
        fill: '#e6e5e8'
      }} />
    </button>
  );
};

export default GroupCallButton;
