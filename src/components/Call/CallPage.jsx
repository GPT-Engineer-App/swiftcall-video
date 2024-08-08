import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import VideoStream from './VideoStream';
import { startCall, endCall, joinCall, initializeSocket } from '../../services/callService';
import { toast } from 'sonner';
import { Phone, PhoneOff, Copy, MessageSquare, Users, Share2, Settings, Layout } from 'lucide-react';
import { Input } from "@/components/ui/input"
import ChatPanel from './ChatPanel';
import ParticipantsList from './ParticipantsList';
import ScreenShare from './ScreenShare';
import CallSettings from './CallSettings';
import VirtualBackground from './VirtualBackground';

const CallPage = () => {
  const [callId, setCallId] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [joinCallId, setJoinCallId] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsListOpen, setIsParticipantsListOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [layout, setLayout] = useState('grid');
  const [isVirtualBackgroundActive, setIsVirtualBackgroundActive] = useState(false);

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
    const socket = initializeSocket();
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
      if (socket) {
        socket.disconnect();
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
      const callData = await joinCall(joinCallId);
      setCallId(callData.callId);
      setIsCallActive(true);
      // Initialize peer connection with callData
      // This would involve setting up WebRTC connection
      toast.success('Joined call successfully!');
    } catch (error) {
      console.error('Failed to join call:', error);
      toast.error('Failed to join call. Please try again.');
    }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleParticipantsList = () => setIsParticipantsListOpen(!isParticipantsListOpen);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleLayout = () => setLayout(layout === 'grid' ? 'speaker' : 'grid');
  const toggleVirtualBackground = () => setIsVirtualBackgroundActive(!isVirtualBackgroundActive);

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
            <div className="flex">
              <div className={`flex-grow ${layout === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
                <VideoStream
                  callId={callId}
                  peerConnection={peerConnection}
                  localStream={localStream}
                  remoteStream={remoteStream}
                  onStreamReady={handleStreamReady}
                  isVirtualBackgroundActive={isVirtualBackgroundActive}
                />
              </div>
              {isChatOpen && <ChatPanel callId={callId} />}
              {isParticipantsListOpen && <ParticipantsList callId={callId} />}
              {isSettingsOpen && <CallSettings />}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Call ID:</span>
                  <span>{callId}</span>
                  <Button onClick={handleCopyCallId} size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={toggleChat} variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleParticipantsList} variant="outline">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleScreenShare} variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleSettings} variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleLayout} variant="outline">
                    <Layout className="h-4 w-4" />
                  </Button>
                  <Button onClick={toggleVirtualBackground} variant="outline">
                    VB
                  </Button>
                  <Button onClick={handleEndCall} variant="destructive">
                    <PhoneOff className="mr-2 h-4 w-4" /> End Call
                  </Button>
                </div>
              </div>
            </div>
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
