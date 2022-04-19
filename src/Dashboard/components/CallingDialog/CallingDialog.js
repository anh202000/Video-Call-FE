import React from 'react';
import './CallingDialog.css';
import ReactLoading from "react-loading";
import { hangUp } from '../../../utils/webRTC/webRTCHandler';
import { MdCallEnd } from 'react-icons/md';
// import { hangUp } from '../../../utils/webRTC/webRTCHandler';
// import { MdCallEnd } from 'react-icons/md';

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

const CallingDialog = () => {
  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  const LoadingType = 'bubbles'

  return (
    <div className='direct_calling_dialog background_calling_color'>
      <span style={{color:'black', fontSize:'18px', marginBottom:'3rem'}}>Calling</span>
      <h3 class="blink"></h3>
      <ReactLoading type={LoadingType} color="#87CEFA" delay='20' height={'3rem'}/>
      <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}>
        <MdCallEnd style={{ width: '22px', height: '22px', fill: '#DC143C' }} />
      </div>
    </div>
  );
};

export default CallingDialog;
