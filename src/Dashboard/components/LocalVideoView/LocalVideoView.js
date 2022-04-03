import React, { useEffect, useRef, useState } from "react";
import ConversationViewers from "../ConvertionViewer/ConversationViewers";
import './styled.css'
import { When } from 'react-if'
import { callStates } from "../../../store/actions/callActions";

const styles = {
  videoContainer: {
    display: "flex",
    width: "12.37rem",
    height: "13.375rem",
    borderRadius: "0.5rem",
    position: "absolute",
    top: "5%",
    right: "23%",
    zindex: "-1",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const LocalVideoView = (props) => {
  const { localStream, remoteStream, callState } = props;
  const localVideoRef = useRef();

  const [checked, setChecked] = useState(true)

  const toggle = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div className="background_secondary_color" style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay onClick={() => alert('123')}></video>

      <When condition={callState !== callStates.CALL_IN_PROGRESS}>
        <When condition={checked}>
          <ConversationViewers {...props} />
        </When>

        <label className="switch">
          <input type="checkbox" checked={checked} onChange ={toggle} />
          <span className="slider round"></span>
        </label>
      </When>

    </div>

  );
};

export default LocalVideoView;
