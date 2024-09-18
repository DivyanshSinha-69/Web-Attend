import React from "react";
import Webcam from "react-webcam";
import { StyledWebCam } from "./style";

const WebCam = ({ onCapture }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <StyledWebCam>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="webcam"
      />
      <button onClick={capture}>Capture</button>
    </StyledWebCam>
  );
};

export default WebCam;
