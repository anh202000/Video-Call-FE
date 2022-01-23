import React from "react";
import { connect } from "react-redux";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RenireVideoview";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog"
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog"
import CallingDialog from "../CallingDialog/CallingDialog"
import { callStates } from "../../../store/actions/callActions";

const DirectCall = (props) => {
  const { localStream, remoteStream, callState, callerUserName, callingDialogVisible } = props;
  console.log(callingDialogVisible,'callingDialogVisible')

  console.log(props)

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/* <CallRejectedDialog/> */}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUserName={callerUserName}/>}
      {callingDialogVisible && <CallingDialog/>}
    </>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
