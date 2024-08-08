import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white"
      >
        <h1 className="text-6xl font-bold mb-6">Welcome to Flashcall Video</h1>
        <p className="text-2xl mb-8">Experience lightning-fast video calls with a flash!</p>
        <div className="space-x-4">
          <Button asChild variant="secondary" className="px-8 py-2 text-lg">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="px-8 py-2 text-lg">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
