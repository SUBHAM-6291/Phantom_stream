// pages/video-call.tsx
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const VideoCallPage = () => {
  const router = useRouter();

  const handleUser1Redirect = () => {
    // Redirect to User 1's page (replace with actual route as needed)
    router.push('/user1');
  };

  const handleUser2Redirect = () => {
    // Redirect to User 2's page (replace with actual route as needed)
    router.push('/user2');
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center space-y-8">
      {/* User 1 and User 2 buttons */}
      <div className="flex space-x-6">
        <button
          onClick={handleUser1Redirect}
          className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          User 1
        </button>
        <button
          onClick={handleUser2Redirect}
          className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          User 2
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
