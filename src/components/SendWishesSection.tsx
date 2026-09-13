import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Wish } from '../types';
import { weddingData } from '../data/weddingData';

interface SendWishesProps {
  onAddWish: (wish: Wish) => void;
}

const AI_WISH_TEMPLATES = [
  'Wishing Alia and Aryan a lifetime filled with unconditional love, boundless laughter, and magical adventures together!',
  'May your sacred bond grow stronger with each passing sunrise. Heartiest congratulations to the gorgeous couple!',
  'To Alia & Aryan: May your home always be filled with warmth, endless joy, harmony, and mutual respect. Cheers to forever!',
  'May the two of you weave a tapestry of unforgettable memories, laughter, and lifelong devotion. Congratulations on your marriage!',
  'Sending immense love and heartfelt blessings to Alia & Aryan as you embark on this beautiful adventure of holy matrimony!',
];

export const SendWishesSection: React.FC<SendWishesProps> = ({ onAddWish }) => {
  const { assets } = weddingData;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [aiIndex, setAiIndex] = useState(0);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleGenerateAi = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const selected = AI_WISH_TEMPLATES[aiIndex % AI_WISH_TEMPLATES.length];
      setMessage(selected);
      setAiIndex((prev) => prev + 1);
      setIsGeneratingAi(false);
      setErrorText('');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorText('Please enter your name.');
      return;
    }
    if (!message.trim()) {
      setErrorText('Please write a warm wish for the couple.');
      return;
    }

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString(),
    };

    onAddWish(newWish);
    setName('');
    setMessage('');
    setErrorText('');
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
    }, 4000);
  };

  return (
    <section className="wed010-wishes-section" id="send-wishes" aria-label="Send your Wishes">
      <div className="wed010-wishes-container">
        {/* Corner Botanical Floral Bouquets */}
        <img src={assets.flowerTopLeft} className="flower top-left" alt="" aria-hidden="true" />
        <img src={assets.flowerTopRight} className="flower top-right" alt="" aria-hidden="true" />
        <img src={assets.flowerBottomLeft} className="flower bottom-left" alt="" aria-hidden="true" />
        <img src={assets.flowerBottomRight} className="flower bottom-right" alt="" aria-hidden="true" />

        <div className="wed010-wishes-content">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="wed010-wishes-title-send"
          >
            Send your Wishes
          </motion.h2>

          <div className="wed010-sendWishes-wrapper">
            <form className="wisher-form" onSubmit={handleSubmit}>
              <input
                id="wisher-name-input"
                type="text"
                placeholder="Your Name"
                className="wisher-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorText) setErrorText('');
                }}
                maxLength={50}
                required
              />

              <div className="wisher-textarea-wrapper relative w-full">
                <textarea
                  id="wisher-message-input"
                  placeholder="Your Wishes"
                  className="wisher-textarea"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorText) setErrorText('');
                  }}
                  maxLength={200}
                  required
                />
                <button
                  type="button"
                  id="generate-ai-wish-btn"
                  onClick={handleGenerateAi}
                  className="wisher-ai-btn"
                  disabled={isGeneratingAi}
                  aria-label="Generate AI wishes"
                  title="Generate AI wishes"
                >
                  <Sparkles
                    size={18}
                    fill="#8c0d0d"
                    className={`transition-transform duration-300 ${isGeneratingAi ? 'animate-spin' : ''}`}
                  />
                  <span>{isGeneratingAi ? 'Generating...' : 'Generate AI wishes'}</span>
                </button>
              </div>

              {errorText && (
                <p className="text-white bg-red-800/80 px-4 py-2 rounded text-xl text-center">
                  {errorText}
                </p>
              )}

              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-center gap-2 text-white bg-emerald-700/80 px-4 py-3 rounded-xl text-2xl text-center shadow-lg"
                  >
                    <CheckCircle2 size={24} className="text-white" />
                    <span>Your heartfelt wish has been sent to Alia & Aryan!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="wisher-btn-container">
                <button type="submit" id="submit-wish-btn" className="wisher-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
