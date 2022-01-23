import React from 'react';
// import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';
import ReactLoading from 'react-loading'

import './IncomingCallDialog.css';

const IncomingCallDialog = ({ callerUsername }) => {
  const handleAcceptButtonPressed = () => {
    // acceptIncomingCallRequest();
  };

  const handleRejectButtonPressed = () => {
    // rejectIncomingCallRequest();
  };

  const LoadingType = 'bubbles'

  return (
    <div className='direct_call_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>{callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
      <ReactLoading type={LoadingType} color="#fff" delay='20' height={'2rem'}/>
    </div>
  );
};

export default IncomingCallDialog;
