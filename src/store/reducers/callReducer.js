import * as callActions from '../actions/callActions';

const initState = {
  localStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUserName: '',
};

const callReducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState
      };
    case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
      return {
        ...state,
        callingDialogVisible: action.visible
      };
    case callActions.CALL_SET_CALLER_USERNAME:
      return {
        ...state,
        callerUserName: action.callerUserName
      };
    default:
      return state;
  }
}
;

export default callReducer;
