import React, { useState } from 'react';

const VideoPreview = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="bg-[#141414] rounded-lg overflow-hidden">
      {/* Preview del video */}
      <div className="relative aspect-video">
        <img 
          src="/img/video-preview.jpg" 
          alt="Tutorial preview" 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsVideoPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-all duration-300"
        >
          <i className="fas fa-play text-4xl text-white opacity-80 hover:opacity-100 transition-opacity"></i>
        </button>
      </div>

      {/* Información del video */}
      <div className="p-4">
        <h3 className="text-white text-lg mb-2">¿Cómo funciona?</h3>
        <p className="text-gray-400 text-sm">Mira este breve tutorial sobre cómo usar SkinDrop</p>
      </div>

      {/* Modal del video */}
      {isVideoPlaying && (
        <VideoModal onClose={() => setIsVideoPlaying(false)} />
      )}
    </div>
  );
};

const VideoModal = ({ onClose }) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div 
      className="relative w-full max-w-4xl bg-[#141414] rounded-lg overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
      >
        <i className="fas fa-times text-xl"></i>
      </button>
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/your-video-id"
          title="Tutorial SkinDrop"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
);

export default VideoPreview;
