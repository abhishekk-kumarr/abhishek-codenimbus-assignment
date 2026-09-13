import React, { useState, useRef, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import { X, MessageCircle, Phone } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const FloatingActions: React.FC = () => {
  const { hero, audioUrl } = weddingData;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.85;
      audio.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying || !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  return (
    <div className="wed010-music-section" aria-label="Floating Controls">
      {/* Audio element with direct src attribute */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Call Button */}
      <button
        type="button"
        id="call-btn"
        onClick={() => setShowCallModal(true)}
        aria-label="Call Host or View Contact"
        className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-white"
      >
        <FaPhone size={24} color="#ffffff" />
      </button>

      {/* Music Toggle Button */}
      <button
        type="button"
        id="music-btn-main"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-white"
      >
        {isPlaying ? (
          <MdMusicNote size={32} color="#ffffff" />
        ) : (
          <MdMusicOff size={32} color="#ffffff" />
        )}
      </button>

      {/* Quick Contact Modal */}
      {showCallModal && (
        <div className="shared-modal-overlay" onClick={() => setShowCallModal(false)}>
          <div
            className="shared-modal-card p-8 text-center max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="w-16 h-16 bg-[#931711]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#931711]">
              <Phone size={32} />
            </div>
            <h3 className="text-3xl font-semibold text-[#931711] mb-2 font-kameron">
              Wedding Host Contact
            </h3>
            <p className="text-xl text-gray-600 mb-6 font-kameron">
              For any venue guidance, RSVP, or celebration inquiries:
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${hero.contact.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-3 w-full bg-[#931711] text-white py-3 px-6 rounded-full text-2xl font-kameron font-medium hover:bg-[#7e140e] transition-colors shadow-md"
              >
                <Phone size={20} />
                <span>Call {hero.contact}</span>
              </a>
              <a
                href={`https://wa.me/${hero.contact.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-3 px-6 rounded-full text-2xl font-kameron font-medium hover:bg-[#20ba59] transition-colors shadow-md"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
