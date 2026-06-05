import React from 'react';

const Loader = () => {
  return (
    // Glassmorphism Overlay (Background Blur)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5]/40 backdrop-blur-md transition-all duration-300">
      
      <div className="relative flex items-center justify-center">
        {/* Outer Spinning Ring - Green */}
        <div className="absolute w-24 h-24 border-4 border-transparent border-t-[#8cc63f] border-b-[#8cc63f] rounded-full animate-spin"></div>
        
        {/* Inner Spinning Ring - Orange (Reverse Spin) */}
        <div 
          className="absolute w-16 h-16 border-4 border-transparent border-l-orange-400 border-r-orange-400 rounded-full animate-spin" 
          style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
        ></div>
        
        {/* Center Element - Bouncing Leaf */}
        <div className="text-3xl animate-bounce drop-shadow-md">
          🍃
        </div>
      </div>

    </div>
  );
};

export default Loader;