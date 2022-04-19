import React from "react";
import { connect } from "react-redux";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RenireVideoview";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog"
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog"
import CallingDialog from "../CallingDialog/CallingDialog"
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled, setMessage } from "../../../store/actions/callActions";
import ConversationButtons from "../ConversationButtons/ConversationButtons";
import Messenger from '../Messenger/Messenger';

const DirectCall = (props) => {
  const { localStream, remoteStream, callState, callerUserName, callingDialogVisible, callRejected, hideCallRejectedDialog, setDirectCallMessage, message, username, onClickShowRightList, showRightList } = props;
  console.log(props?.callerUserName, 'props props 123')
  return (
    <>
      <LocalVideoView localStream={localStream} {...props}/>
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog}/>}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUserName={callerUserName}/>}
      {callingDialogVisible && <CallingDialog/>}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons {...props} />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger showRightList={showRightList} onClickShowRightList={onClickShowRightList} message={message} setDirectCallMessage={setDirectCallMessage} username={username} callerUserName={callerUserName}/>}
    </>
  );
};

function mapStoreStateToProps({ call, dashboard }) {
  return {
    ...call,
    ...dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) => dispatch(setMessage(received, content))
  };
}


export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
