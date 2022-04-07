import React, { useEffect } from 'react';

import './CallRejectedDialog.css';

const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      });
    }, [4000]);
  }, []);

  return (
    <div className='direct_calling_dialog background_calling_color'>
      <span style={{ color: 'black', fontSize: '20px', marginBottom: '3rem' }}>
        {reason}
      </span>
    </div>
  );
};

export default CallRejectedDialog;
