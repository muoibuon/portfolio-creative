import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/portfolio';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" ref={ref} style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            KIND WORDS
          </p>
          <h2 className="section-title">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Feedback from clients and colleagues
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto 3rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="card"
              style={{ padding: '2.5rem', textAlign: 'center', position: 'relative' }}
            >
              {/* Quote mark */}
              <div style={{
                fontSize: '6rem',
                lineHeight: 0.6,
                color: 'rgba(124,58,237,0.15)',
                fontFamily: 'Georgia, serif',
                marginBottom: '1.5rem',
                textAlign: 'left',
              }}>
                "
              </div>

              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#e2e8f0',
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}>
                {testimonials[current].content}
              </p>

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ fontSize: '1.25rem' }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {testimonials[current].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                    {testimonials[current].name}
                  </div>
                  <div style={{ color: '#7c3aed', fontSize: '0.875rem', fontWeight: 500 }}>
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 50,
                  border: 'none',
                  background: i === current ? '#7c3aed' : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* All testimonials mini grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              onClick={() => setCurrent(i)}
              className="card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                borderColor: current === i ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.06)',
                background: current === i ? 'rgba(124,58,237,0.05)' : 'var(--bg-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{t.role}</div>
                </div>
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.8rem',
                lineHeight: 1.7,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                "{t.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
