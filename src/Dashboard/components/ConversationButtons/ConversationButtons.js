import React, { useState } from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera, MdViewList } from 'react-icons/md';
import { hangUp, switchForScreenSharingStream } from '../../../utils/webRTC/webRTCHandler';
import ConversationButton from './ConversationButton';
import { When } from 'react-if'
import './styled.css'
import WhiteBoard from '../WhiteBoard/whiteboard';
// import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall,
    leaveRoom
  } = props;

  const [showContextMenu, setShowContextmenu] = useState(false)
  const [showWhiteBoard, setshowWhiteBoard] = useState(false)
  const onClickContextMenu = () => setShowContextmenu(!showContextMenu)
  const onClickWhiteBoard = () => {
  setshowWhiteBoard(!showWhiteBoard)
  onClickContextMenu()
  }

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  var elem = document.getElementById("dashboard_content_container");

  const onClickFullScreen = () => {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
      onClickContextMenu()
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationButton>
      <ConversationButton onClickHandler={groupCall ? leaveRoom : handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationButton>
      <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
      </ConversationButton>
      <ConversationButton onClickHandler={onClickContextMenu}>
        <MdViewList style={styles.icon} />
      </ConversationButton>

      <When condition={showContextMenu}>
        <div className='menu-context background_calling_color'>
          <ul>
            <li><a onClick={onClickFullScreen}>Full screen</a></li>
            <li><a onClick={onClickWhiteBoard}>White board</a></li>
          </ul>
        </div>
      </When>

      <When condition={showWhiteBoard}>
        <WhiteBoard onClickWhiteBoard={onClickWhiteBoard}/>
      </When>
    </div>
  );
};

export default ConversationButtons;
