import React, { useState, useEffect } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import MessageDisplayer from './MessageDisplayer';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { MdEmojiEmotions } from 'react-icons/md';
import { When } from 'react-if'

import './Messenger.css';

const styles = {
  icon: {
    width: '25px',
    height: '25px',
    fill: '#87CEFA',
    position: 'absolute',
    bottom: '21.5%',
    right: '21%'
  }
};

const Messenger = ({ message, setDirectCallMessage, username }) => {
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
    <When condition={emoji}>
      <Picker 
      style={{ position: 'absolute', bottom: '26%', right: '3%', zIndex: '999', width: '18rem', height: '24rem'}} 
      onSelect={onClickEmoji}
      showPreview={false}
      showSkinTones={false}
      />
    </When>
      
      <input
        className='messages_input'
        type='123'
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value); }}
        onKeyDown={handleOnKeyDownEvent}
        placeholder='Type your message'
      />
      <MdEmojiEmotions style={styles.icon} onClick={onClickShowEmoji}/>
      {message.received && <MessageDisplayer message={message.content} />}
    </div>
  );
};

export default Messenger;
