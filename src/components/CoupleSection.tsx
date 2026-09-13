import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  const { couple, assets } = weddingData;

  return (
    <section className="wed010-couple-section" id="couple" aria-label="About Couple">
      <div className="wed010-Aboutcouple">
        <div className="couple-container">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="couple-card wed010-bride-info"
          >
            <div className="image-wrapperbride">
              <img
                src={couple.bride.photo}
                alt={couple.bride.name}
                className="wed010-brideimage"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/assets/wed010/bride.jpg';
                  }
                }}
              />
              <div className="wed010-bride-arch-border" aria-hidden="true" />
            </div>
            <div className="couplebride-info">
              <h2 className="wed010-name">{couple.bride.name}</h2>
              <p className="wed010-relation">{couple.bride.parents}</p>
              <p className="wed010-desc">{couple.bride.bio}</p>
            </div>
          </motion.div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="couple-card wed010-groom-info"
          >
            <div className="image-wrappergroom">
              <img
                src={couple.groom.photo}
                alt={couple.groom.name}
                className="wed010-groomimage"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/assets/wed010/groom.jpg';
                  }
                }}
              />
              <div className="wed010-groom-arch-border" aria-hidden="true" />
            </div>
            <div className="couplegroom-info">
              <h2 className="wed010-name">{couple.groom.name}</h2>
              <p className="wed010-relation">{couple.groom.parents}</p>
              <p className="wed010-desc">{couple.groom.bio}</p>
            </div>
          </motion.div>
        </div>

        {/* Floral Flourishes */}
        <img
          src={assets.aboutDesign}
          alt=""
          className="wed010-floral-left"
          aria-hidden="true"
        />
        <img
          src={assets.aboutDesign}
          alt=""
          className="wed010-floral-right"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
