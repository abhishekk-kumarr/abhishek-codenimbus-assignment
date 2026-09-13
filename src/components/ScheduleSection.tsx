import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';

export const ScheduleSection: React.FC = () => {
  const { schedule, assets } = weddingData;
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const currentDay = schedule[selectedDayIndex] || schedule[0];

  return (
    <section className="wed010-schedule-section" id="schedule" aria-label="Wedding Schedule">
      <div className="wed010-schedule-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="wed010-heading"
        >
          The wedding celebrations begins!
        </motion.h2>

        {/* Decorative corner florals */}
        <img
          src={assets.flowerTopLeft}
          className="wed010-design-top"
          alt=""
          aria-hidden="true"
        />
        <img
          src={assets.flowerBottomRight}
          className="wed010-design-bottom"
          alt=""
          aria-hidden="true"
        />

        {/* Schedule Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`wed010-stage ${schedule.length <= 1 ? 'wed010-single' : ''}`}
        >
          <div className="wed010-photoWrap">
            <img
              src={currentDay.image}
              className="wed010-photo"
              alt="Celebration Venue"
            />
          </div>

          <div className="wed010-card">
            <h3 className="wed010-cardTitle">{currentDay.sectionTitle}</h3>
            <p className="wed010-dateTop">{currentDay.displayDate}</p>

            <div className="wed010-eventsList">
              {currentDay.events.map((event, idx) => (
                <div key={idx} className="wed010-eventRow">
                  <span className="wed010-eventName">{event.eventName}</span>
                  <span className="wed010-eventTime">{event.eventTime}</span>
                </div>
              ))}
            </div>

            <p className="wed010-address">{currentDay.locationAddress}</p>

            <a
              href={currentDay.mapLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="wed010-mapBtn"
              id="schedule-map-btn"
            >
              View in Map
            </a>
          </div>
        </motion.div>

        {/* Controls / Day Pills - only visible if multiple days */}
        {schedule.length > 1 && (
          <div className="wed010-controls">
            {schedule.map((day, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDayIndex(idx)}
                className="wed010-namePill cursor-pointer hover:opacity-95 transition-opacity"
                id={`schedule-day-btn-${idx}`}
              >
                {day.sectionTitle}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
