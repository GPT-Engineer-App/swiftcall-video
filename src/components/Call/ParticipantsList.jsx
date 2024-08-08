import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

const ParticipantsList = ({ callId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // TODO: Implement fetching participants from backend
    setParticipants([
      { id: 1, name: 'You' },
      { id: 2, name: 'John Doe' },
      { id: 3, name: 'Jane Smith' },
    ]);
  }, [callId]);

  return (
    <div className="w-64 border-l border-gray-200 p-4">
      <h3 className="font-bold mb-4">Participants ({participants.length})</h3>
      <ScrollArea className="h-full">
        {participants.map((participant) => (
          <div key={participant.id} className="mb-2">
            {participant.name}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ParticipantsList;
