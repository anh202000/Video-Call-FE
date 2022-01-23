import {
  callStates,
  setCallerUserName,
  setCallingDialogVisible,
  setCallState,
  setLocalStream,
} from "../../store/actions/callActions";
import store from "../../store/store";
import * as wss from "../wssConnection/wssConnection";

const defaultConstrains = {
  video: true,
  audio: true,
};

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

let connectedUserSocketId;

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

export const handlePreOffer = (data) => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallerUserName(data.callerUserName));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
