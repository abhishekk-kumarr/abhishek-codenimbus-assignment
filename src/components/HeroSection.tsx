import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export const HeroSection: React.FC = () => {
  const { hero, assets } = weddingData;

  return (
    <section className="wed010-herosection" id="home" aria-label="Wedding Invitation Hero">
      {/* Top Garland Floral Decoration */}
      <img
        src={assets.heroTopDecoration}
        alt=""
        className="wed010-topdecoration"
        aria-hidden="true"
      />

      {/* Central Hero Content - Appears after mandap animates up */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 1.1, ease: 'easeOut' }}
        className="wed010-hero-invite-content"
      >
        <p className="invite-text">
          Inviting you to the celebration of
        </p>

        <h1 className="couple-names">
          <span className="bride">{hero.bride_name}</span>
          <span className="and">weds</span>
          <span className="groom">{hero.groom_name}</span>
        </h1>

        <p className="wed010-invite-details">
          Oct 30 & 31, 2026 | Hall Complex
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={hero.venue_link}
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
          id="hero-map-btn"
        >
          View in Map
        </motion.a>
      </motion.div>

      {/* Center Wedding Mandap (Bride & Groom) - Animates upwards initially */}
      <motion.div
        initial={{ opacity: 0, y: 130 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mandap-container"
      >
        <img
          src={assets.mandap}
          alt="Royal Wedding Mandap"
          className="mandap-img"
        />
      </motion.div>

      {/* Bottom Floral Bouquets (Both Sides) - Animate upwards after text */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="wed010-bottomdesign-left"
      >
        <img
          src={assets.heroBottomDesign}
          alt="Floral Urn Left"
          className="w-full h-auto block pointer-events-none"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
        className="wed010-bottomdesign-right"
      >
        <img
          src={assets.heroBottomDesign}
          alt="Floral Urn Right"
          className="w-full h-auto block pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />
      </motion.div>
    </section>
  );
};
