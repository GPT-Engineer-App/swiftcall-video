import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import VideoStream from './VideoStream';
import { startCall, endCall } from '../../services/callService';

const CallPage = () => {
  const [callId, setCallId] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    // Initialize any necessary call setup
  }, []);

  const handleStartCall = async () => {
    try {
      const newCallId = await startCall();
      setCallId(newCallId);
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall(callId);
      setIsCallActive(false);
      setCallId(null);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Flashcall Video Call</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {isCallActive ? (
            <>
              <VideoStream callId={callId} />
              <Button onClick={handleEndCall} className="mt-4 bg-red-500 hover:bg-red-600">End Call</Button>
            </>
          ) : (
            <Button onClick={handleStartCall} className="bg-green-500 hover:bg-green-600">Start New Call</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallPage;
