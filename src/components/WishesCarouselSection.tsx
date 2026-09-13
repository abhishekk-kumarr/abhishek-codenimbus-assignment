import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wish } from '../types';
import { weddingData } from '../data/weddingData';

interface WishesCarouselProps {
  wishes: Wish[];
}

export const WishesCarouselSection: React.FC<WishesCarouselProps> = ({ wishes }) => {
  const { assets } = weddingData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalWishes = wishes.length;
  const currentWish = wishes[currentIndex] || wishes[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalWishes - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalWishes - 1 ? 0 : prev + 1));
  };

  return (
    <section className="wed010-wishes" id="wishes-carousel" aria-label="Wishes for the Couple">
      {/* 4 Corner Rotated Flourishes */}
      <img src={assets.aboutDesign} alt="" className="wed010-design d1" aria-hidden="true" />
      <img src={assets.aboutDesign} alt="" className="wed010-design d2" aria-hidden="true" />
      <img src={assets.aboutDesign} alt="" className="wed010-design d3" aria-hidden="true" />
      <img src={assets.aboutDesign} alt="" className="wed010-design d4" aria-hidden="true" />

      <div className="wed010-wishes-inner">
        <div className="wed010-wishes-left">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="wed010-wishes-title"
          >
            Wishes for the couple
          </motion.h2>
        </div>

        <div className="wed010-wishes-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="wed010-wish-card"
          >
            <div className="wed010-wishes-whiteBg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWish.id || currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col justify-between items-center h-full"
                >
                  <p className="wed010-wisher-name" id="current-wisher-name">
                    {currentWish.name}
                  </p>
                  <p className="wed010-wish-message" id="current-wish-message">
                    {currentWish.message}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="wed010-wish-footer">
                <button
                  type="button"
                  id="prev-wish-btn"
                  onClick={handlePrev}
                  className="wed010-arrow-wishes"
                  aria-label="Previous wish"
                >
                  &lt;
                </button>
                <span className="wed010-counter-wishes" id="wishes-counter">
                  {currentIndex + 1} of {totalWishes}
                </span>
                <button
                  type="button"
                  id="next-wish-btn"
                  onClick={handleNext}
                  className="wed010-arrow-wishes"
                  aria-label="Next wish"
                >
                  &gt;
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
