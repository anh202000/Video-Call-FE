import React from 'react';
import Tooltip from '@atlaskit/tooltip';

const SubmitButton = ({ handleSubmitButtonPressed }) => {
  return (
    <div className='login-page_button_container'>
      <Tooltip content="Join now">
        <button
          className='login-page_button background_main_color text_main_color'
          onClick={handleSubmitButtonPressed}
        >
          Join now
        </button>
      </Tooltip>
    </div>

  );
};

export default SubmitButton;
