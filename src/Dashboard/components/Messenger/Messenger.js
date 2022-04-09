import React, { useState, useEffect } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import 'emoji-mart/css/emoji-mart.css'
import { MdOutlineMessage } from 'react-icons/md';
import { When } from 'react-if'

import './Messenger.css';
import ChatForm from './chatform/chatform';

const styles = {
  icon: {
    width: '30px',
    height: '26px',
    fill: '#FFFAF0',
    position: 'absolute',
    bottom: '21.5%',
    right: '21%'
  }
};

const Messenger = ({ message, setDirectCallMessage, username, onClickShowRightList, showRightList, callerUserName }) => {
  const [inputValue, setInputValue] = useState('');
  const [emoji, setEmoji] = useState(false);

  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue, username);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (message.received) {
      setTimeout(() => {
        setDirectCallMessage(false, '');
      }, [3000]);
    }
  }, [message.received]);

  const onClickEmoji = (event) => {
    setInputValue(inputValue ? inputValue + event.native : event.native)
  }

  const onClickShowEmoji = () => {
    setEmoji(!emoji)
  }

  return (
    <div>
      <div class="icon">
        <MdOutlineMessage style={styles.icon} onClick={onClickShowRightList} />
      </div>
      <When condition={showRightList !== true}>
        <ChatForm message={message} setDirectCallMessage={setDirectCallMessage} username={username} callerUserName={callerUserName} />
      </When>
    </div>
  );
};

export default Messenger;
