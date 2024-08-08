import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

const ScreenShare = ({ onScreenShare }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      onScreenShare(stream);
      setIsSharing(true);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenShare = () => {
    // TODO: Implement stop screen sharing
    setIsSharing(false);
  };

  return (
    <Button onClick={isSharing ? stopScreenShare : handleScreenShare}>
      {isSharing ? 'Stop Sharing' : 'Share Screen'}
    </Button>
  );
};

export default ScreenShare;
