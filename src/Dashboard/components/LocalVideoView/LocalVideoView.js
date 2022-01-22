import React, { useEffect, useRef } from "react";

const styles = {
  videoContainer: {
    width: "9.37rem",
    height: "9.375rem",
    borderRadius: "0.5rem",
    position: "absolute",
    top: "5%",
    right: "23%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const LocalVideoView = (props) => {
  const { localStream } = props;
  const localVideoRef = useRef();

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
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted></video>
    </div>
  );
};

export default LocalVideoView;
