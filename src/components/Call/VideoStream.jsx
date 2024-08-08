import React, { useEffect, useRef } from 'react';

const VideoStream = ({ callId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Here you would typically set up the WebRTC connection
    // and attach the stream to the video element
    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupVideoStream();

    return () => {
      // Clean up the stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [callId]);

  return (
    <div className="aspect-w-16 aspect-h-9">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full h-full object-cover" />
    </div>
  );
};

export default VideoStream;
