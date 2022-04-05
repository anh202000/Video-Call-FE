import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: "12.37rem",
    height: "13.375rem",
    borderRadius: "0.5rem",
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
    </div>
  );
};

export default GroupCallVideo;
