import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import { hangUp, switchForScreenSharingStream } from '../../../utils/webRTC/webRTCHandler';
import ConversationViewer from './ConversationViewer';
// import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '0.25%',
    left: '26%'
  },
  icon: {
    width: '18px',
    height: '18px',
    fill: '#e6e5e8'
  },
};

const ConversationViewers = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

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

  return (
    <div style={styles.buttonContainer}>
      <ConversationViewer onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationViewer>
      {/* {!groupCall && <ConversationViewer onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationViewer>} */}
      <ConversationViewer onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationViewer>
      {/* {!groupCall && <ConversationViewer onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
      </ConversationViewer>} */}
    </div>
  );
};

export default ConversationViewers;
