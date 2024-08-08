import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import VideoStream from './VideoStream';
import { startCall, endCall } from '../../services/callService';
import { toast } from 'sonner';
import { Phone, PhoneOff, Copy } from 'lucide-react';
import { Input } from "@/components/ui/input"

const CallPage = () => {
  const [callId, setCallId] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [joinCallId, setJoinCallId] = useState('');

  const setupPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onicecandidate = event => {
      if (event.candidate) {
        // Send the candidate to the remote peer
        // This should be implemented in your signaling server
      }
    };

    pc.ontrack = event => {
      setRemoteStream(event.streams[0]);
    };

    setPeerConnection(pc);
  }, []);

  useEffect(() => {
    setupPeerConnection();
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [setupPeerConnection]);

  const handleStartCall = async () => {
    try {
      const newCallId = await startCall();
      setCallId(newCallId);
      setIsCallActive(true);
      toast.success('Call started successfully!');
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call. Please try again.');
    }
  };

  const handleJoinCall = async () => {
    try {
      // Implement join call logic here
      setCallId(joinCallId);
      setIsCallActive(true);
      toast.success('Joined call successfully!');
    } catch (error) {
      console.error('Failed to join call:', error);
      toast.error('Failed to join call. Please try again.');
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall(callId);
      setIsCallActive(false);
      setCallId(null);
      setRemoteStream(null);
      if (peerConnection) {
        peerConnection.close();
      }
      setupPeerConnection();
      toast.info('Call ended');
    } catch (error) {
      console.error('Failed to end call:', error);
      toast.error('Failed to end call. Please try again.');
    }
  };

  const handleCopyCallId = () => {
    navigator.clipboard.writeText(callId);
    toast.success('Call ID copied to clipboard');
  };

  const handleStreamReady = (stream) => {
    setLocalStream(stream);
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Flashcall Video Call</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {isCallActive ? (
            <>
              <VideoStream
                callId={callId}
                peerConnection={peerConnection}
                localStream={localStream}
                remoteStream={remoteStream}
                onStreamReady={handleStreamReady}
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Call ID:</span>
                  <span>{callId}</span>
                  <Button onClick={handleCopyCallId} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleEndCall} variant="destructive">
                  <PhoneOff className="mr-2 h-4 w-4" /> End Call
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <Button onClick={handleStartCall} className="bg-green-500 hover:bg-green-600 w-full">
                <Phone className="mr-2 h-4 w-4" /> Start New Call
              </Button>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter Call ID to join"
                  value={joinCallId}
                  onChange={(e) => setJoinCallId(e.target.value)}
                />
                <Button onClick={handleJoinCall} variant="secondary">
                  Join Call
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallPage;
