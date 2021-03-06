import React, { useState } from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import PopupRoom from '../PopupRoom/PopupRoom';
import { When } from 'react-if'
import Messenger from '../Messenger/Messenger';

const GroupCall = (props) => {
  const { callState, localStream, groupCallActive, groupCallStreams, showRightList, onClickShowRightList, message, setDirectCallMessage, username  } = props;
  console.log(props, 'props')
  const { groupCallRooms } = props;
  const [showPopup, setShowPopup] = useState(false)
  const onClickShowRoom = () => setShowPopup(!showPopup)

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <>
      <When condition={showPopup}>
        <PopupRoom onClickShowRoom={onClickShowRoom}/>
      </When>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
        <GroupCallButton onClickHandler={onClickShowRoom} label='Create room' />}
      {groupCallActive && <GroupCallRoom {...props} leaveRoom={leaveRoom}/>}
      {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label='Leave room' />}
      {groupCallActive && <Messenger showRightList={showRightList} onClickShowRightList={onClickShowRightList} message={message} setDirectCallMessage={setDirectCallMessage} username={username} callerUserName={username}/>}
    </>
  );
};

const mapStoreStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
