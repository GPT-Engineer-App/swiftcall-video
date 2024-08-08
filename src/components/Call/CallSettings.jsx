import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const CallSettings = () => {
  const [audioInput, setAudioInput] = useState('');
  const [videoInput, setVideoInput] = useState('');
  const [audioOutput, setAudioOutput] = useState('');

  // TODO: Implement fetching available devices

  const handleSaveSettings = () => {
    // TODO: Implement saving settings
  };

  return (
    <div className="w-64 border-l border-gray-200 p-4">
      <h3 className="font-bold mb-4">Call Settings</h3>
      <div className="space-y-4">
        <div>
          <label>Audio Input</label>
          <Select value={audioInput} onChange={(e) => setAudioInput(e.target.value)}>
            {/* TODO: Add options */}
          </Select>
        </div>
        <div>
          <label>Video Input</label>
          <Select value={videoInput} onChange={(e) => setVideoInput(e.target.value)}>
            {/* TODO: Add options */}
          </Select>
        </div>
        <div>
          <label>Audio Output</label>
          <Select value={audioOutput} onChange={(e) => setAudioOutput(e.target.value)}>
            {/* TODO: Add options */}
          </Select>
        </div>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default CallSettings;
