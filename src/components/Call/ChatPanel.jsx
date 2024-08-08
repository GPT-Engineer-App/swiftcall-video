import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const ChatPanel = ({ callId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // TODO: Implement real-time message fetching
  }, [callId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Implement sending message to backend
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="w-64 border-l border-gray-200 p-4 flex flex-col h-full">
      <h3 className="font-bold mb-4">Chat</h3>
      <ScrollArea className="flex-grow mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </ScrollArea>
      <div className="flex">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatPanel;
