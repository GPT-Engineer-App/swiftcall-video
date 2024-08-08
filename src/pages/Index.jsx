import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Welcome to Flashcall Video</h1>
        <p className="text-2xl mb-8">Experience lightning-fast video calls with a flash!</p>
        <div className="space-x-4">
          <Button asChild variant="secondary">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
