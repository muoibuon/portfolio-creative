import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/portfolio';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            MY JOURNEY
          </p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Where I've been and what I've learned
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #7c3aed, #ec4899, transparent)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          {experience.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  paddingRight: isLeft ? 'calc(50% + 2rem)' : '0',
                  paddingLeft: isLeft ? '0' : 'calc(50% + 2rem)',
                  marginBottom: '3rem',
                  position: 'relative',
                }}
              >
                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.2 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.5rem',
                    transform: 'translateX(-50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: item.color,
                    border: '3px solid var(--bg-primary)',
                    boxShadow: `0 0 20px ${item.color}60`,
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <div
                  className="card"
                  style={{
                    padding: '1.5rem',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Period badge */}
                  <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.75rem',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    borderRadius: 50,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: item.color,
                    marginBottom: '0.75rem',
                  }}>
                    {item.period}
                  </span>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {item.role}
                  </h3>
                  <p style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    {item.company}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {item.description}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {item.achievements.map(achievement => (
                      <li key={achievement} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                      }}>
                        <span style={{ color: item.color, fontSize: '0.6rem' }}>▲</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experience .container > div > div:nth-child(2) > div {
            padding-right: 0 !important;
            padding-left: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
