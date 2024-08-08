import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VideoStream = ({ callId, peerConnection, localStream, remoteStream, onStreamReady }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        onStreamReady(stream);
        toast.success('Camera and microphone connected successfully');
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera or microphone');
      }
    };

    setupVideoStream();

    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [callId, onStreamReady]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
      toast.info(isMuted ? 'Microphone unmuted' : 'Microphone muted');
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
      toast.info(isVideoOff ? 'Camera turned on' : 'Camera turned off');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <video ref={localVideoRef} autoPlay playsInline muted className="rounded-lg w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 space-x-2">
          <Button onClick={toggleMute} variant="secondary" size="icon">
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={toggleVideo} variant="secondary" size="icon">
            {isVideoOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="relative">
        <video ref={remoteVideoRef} autoPlay playsInline className="rounded-lg w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default VideoStream;
