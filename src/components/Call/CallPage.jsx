import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import VideoStream from './VideoStream';
import { startCall, endCall } from '../../services/callService';
import { toast } from 'sonner';
import { Phone, PhoneOff } from 'lucide-react';

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
      toast.success('Call started successfully!');
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call. Please try again.');
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall(callId);
      setIsCallActive(false);
      setCallId(null);
      toast.info('Call ended');
    } catch (error) {
      console.error('Failed to end call:', error);
      toast.error('Failed to end call. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Flashcall Video Call</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {isCallActive ? (
            <>
              <VideoStream callId={callId} />
              <Button onClick={handleEndCall} className="mt-4 bg-red-500 hover:bg-red-600 w-full">
                <PhoneOff className="mr-2 h-4 w-4" /> End Call
              </Button>
            </>
          ) : (
            <Button onClick={handleStartCall} className="bg-green-500 hover:bg-green-600 w-full">
              <Phone className="mr-2 h-4 w-4" /> Start New Call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallPage;
