import {
  callStates,
  setCallerUserName,
  setCallingDialogVisible,
  setCallRejected,
  setCallState,
  setLocalStream,
} from "../../store/actions/callActions";
import store from "../../store/store";
import * as wss from "../wssConnection/wssConnection";

const preOfferAnswers = {
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
};

const defaultConstrains = {
  video: true,
  audio: true,
};

const configuration = {
  iceServers: [{
    url: 'stun:stun.l.google.com.13902'
  }]
}

let connectedUserSocketId;
let peerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((err) => {
      console.log(
        " error occured when trying to get an access to get local stream"
      );
      console.log(err);
    });
};

export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  });
};

const createPeerConnection = () => {
  peerConnection =  new RTCPeerConnection(configuration)
}

export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUserName(data.callerUserName));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data?.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

// call dialog oke
export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

// calling
export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });
  resetCallData();
};

export const handlePreOfferAnswer = (data) => {
  console.log(data, 'data')
  store.dispatch(setCallingDialogVisible(false))
  if(data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // TODO SEND WEB RTC OFFER
    console.log(data, 'data')
  } else {
    let rejectionReason = '';
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now'
    } else {
    rejectionReason = 'Call rejected by the callee'
    }
    store.dispatch(setCallRejected({
      rejected: true,
      reason: rejectionReason
    }))
  }
}

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
