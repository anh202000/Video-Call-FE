import React, { useEffect, useRef } from "react";
import { BsPip } from "react-icons/bs";

const styles = {
  videoContainer: {
    width: "100%",
    height: "100%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const RemoteVideoView = (props) => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();
  const pipSupported = document.pictureInPictureEnabled;

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  const handleClick = async () => {
    if (!remoteVideoRef.current) return;
    try {
      if (remoteVideoRef.current !== document.pictureInPictureElement) {
        await remoteVideoRef.current.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.videoContainer}>
      <video
        style={styles.videoElement}
        ref={remoteVideoRef}
        autoPlay
        muted
      ></video>

      <button
        style={{
          border: "none",
          borderRadius: "10px",
          position: "absolute",
          bottom: "26%",
          right: "21%",
        }}
        className="btn green"
        disabled={!pipSupported}
        onClick={handleClick}
      >
        <BsPip
          style={{
            width: "28px",
            height: "28px",
            marginLeft: "4px",
            verticalAlign: "middle",
            fill: "#00796b",
          }}
        />
      </button>
    </div>
  );
};

export default RemoteVideoView;
