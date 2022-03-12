import React from 'react';
import './CallingDialog.css';
import ReactLoading from "react-loading";
// import { hangUp } from '../../../utils/webRTC/webRTCHandler';
// import { MdCallEnd } from 'react-icons/md';

const styles = {
  buttonContainer: {
    marginTop: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    border: '2px solid #e6e5e8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const CallingDialog = () => {
  const handleHangUpButtonPressed = () => {
    // hangUp();
  };

  const LoadingType = 'bubbles'

  return (
    <div className='direct_calling_dialog background_secondary_color'>
      <span>Calling</span>
      {/* <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}> */}
        {/* <MdCallEnd style={{ width: '20px', height: '20px', fill: '#e6e5e8' }} /> */}
        {/* <ReactLoading type={LoadingType} color="#fff" delay='20' height={'2rem'}/> */}
      {/* </div> */}
    </div>
  );
};

export default CallingDialog;