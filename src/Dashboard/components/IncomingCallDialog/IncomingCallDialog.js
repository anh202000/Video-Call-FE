import React from 'react';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';
import ReactLoading from 'react-loading'

import './IncomingCallDialog.css';
import { MdCall, MdCallEnd, MdCallMade } from 'react-icons/md';

const IncomingCallDialog = (props) => {
  const { callerUserName } = props
  const styles = {
    buttonContainer: {
      marginTop: '10px',
      width: '40px',
      height: '40px',
      borderRadius: '40px',
      border: '2px solid #DCDCDC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
  };

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  const LoadingType = 'bubbles'

  return (
    <div className='direct_calling_dialog background_calling_color'>
      <span style={{ color: 'black', fontSize: '20px', marginBottom: '3rem' }}>{props.callerUserName.toUpperCase()} calling you</span>
      <h3 class="blink"></h3>
      <div>
        <ReactLoading type={LoadingType} color="#87CEFA" delay='20' height={'3rem'} />
      </div>
      <div className='direct_call_dialog_button_container'>
        <div className="call-accept" style={styles.buttonContainer} onClick={handleAcceptButtonPressed}>
          <MdCall style={{ width: '22px', height: '22px', fill: '#87CEFA' }} />
        </div>
        <div className="call-reject" style={styles.buttonContainer} onClick={handleRejectButtonPressed}>
          <MdCallEnd style={{ width: '22px', height: '22px', fill: '#DC143C' }} />
        </div>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
