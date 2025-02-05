import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VideoPreview = () => {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="bg-[#141414] rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <img 
          src="https://img.youtube.com/vi/O0c0IWHmTAs/maxresdefault.jpg" 
          alt={t('home.tutorial.title')} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsVideoPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-40 transition-all duration-300"
        >
          <i className="fas fa-play text-4xl text-white opacity-80 hover:opacity-100 transition-opacity"></i>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg mb-2">{t('home.tutorial.title')}</h3>
        <p className="text-gray-400 text-sm">{t('home.tutorial.description')}</p>
      </div>

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
          src="https://www.youtube.com/embed/O0c0IWHmTAs?enablejsapi=1&autoplay=1&showinfo=1&controls=1&rel=0"
          title="Good bye CS:GO, welcome CS2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="eager"
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
        ></iframe>
      </div>
    </div>
  </div>
);

export default VideoPreview;
