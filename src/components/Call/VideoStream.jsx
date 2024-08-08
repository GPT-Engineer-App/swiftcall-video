import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const VideoStream = ({ callId }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        toast.success('Camera and microphone connected successfully');
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera or microphone');
      }
    };

    setupVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [callId]);

  const toggleMute = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTracks = videoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
      toast.info(isMuted ? 'Microphone unmuted' : 'Microphone muted');
    }
  };

  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9">
        <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full h-full object-cover" />
      </div>
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
};

export default VideoStream;
