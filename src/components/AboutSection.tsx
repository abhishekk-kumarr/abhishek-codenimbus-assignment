import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export const AboutSection: React.FC = () => {
  const { story, family, assets } = weddingData;
  const [activeFamily, setActiveFamily] = useState<'bride' | 'groom'>('bride');

  const storyItem = story[0];
  const currentFamily = family[activeFamily];

  return (
    <div className="w-full" id="about">
      {/* Our Love Story Section */}
      <section className="wed010-story-section" aria-label="Our Love Story">
        {/* Corner floral ornaments */}
        <img
          src={assets.aboutDesign}
          alt=""
          className="wed010-story-design-left"
          aria-hidden="true"
        />
        <img
          src={assets.aboutDesign}
          alt=""
          className="wed010-story-design-right"
          aria-hidden="true"
        />

        <div className="wed010-story-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Our Love Story
          </motion.h2>

          <div className="timeline">
            <div className="timeline-item left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="timeline-content"
              >
                <h3 className="event-title">{storyItem.title}</h3>
                <p className="event-date">{storyItem.date}</p>
                <p className="event-description">{storyItem.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="timeline-image"
              >
                <div className="timeline-image-border">
                  <img
                    src={storyItem.image}
                    alt="First meet moment"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = '/assets/wed010/love_story.jpg';
                      }
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet our Family Section */}
      <section className="wed010-family-section" aria-label="Meet our Family">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="wed010-family-heading"
        >
          Meet our Family
        </motion.h2>

        <div className="wed010-family-card-wrap">
          <div className="relative w-full max-w-[600px] flex justify-center">
            {/* Corner florals aligned exactly at the frame corners */}
            <img
              src={assets.flowerTopLeft}
              alt=""
              className="absolute -top-12 -left-12 sm:-left-20 md:-left-28 w-32 sm:w-40 md:w-48 pointer-events-none z-10"
              aria-hidden="true"
            />
            <img
              src={assets.flowerBottomRight}
              alt=""
              className="absolute -bottom-20 sm:-bottom-24 -right-12 sm:-right-20 md:-right-28 w-32 sm:w-40 md:w-48 pointer-events-none z-10"
              aria-hidden="true"
            />

            <motion.div
              key={activeFamily}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="wed010-family-frame"
            >
              <img
                src={currentFamily.photo}
                alt={`${currentFamily.label} family`}
                className="wed010-family-arch-img"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src =
                      activeFamily === 'bride'
                        ? '/assets/wed010/bride_family.jpg'
                        : '/assets/wed010/groom_family.jpg';
                  }
                }}
              />
            </motion.div>
          </div>

          <div className="wed010-family-toggles">
            <button
              type="button"
              id="family-bride-btn"
              onClick={() => setActiveFamily('bride')}
              className={`wed010-family-btn ${activeFamily === 'bride' ? 'active' : 'inactive'}`}
            >
              Bride
            </button>
            <button
              type="button"
              id="family-groom-btn"
              onClick={() => setActiveFamily('groom')}
              className={`wed010-family-btn ${activeFamily === 'groom' ? 'active' : 'inactive'}`}
            >
              Groom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
