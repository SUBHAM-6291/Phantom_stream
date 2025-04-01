// pages/index.tsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';


const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/video-call');
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-300 transition duration-300"
      >
        Start Video Call
      </button>
    </div>
  );
};

export default HomePage;
