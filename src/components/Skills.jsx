import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Design'];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            WHAT I KNOW
          </p>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with daily
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 50,
                border: '1px solid',
                borderColor: activeCategory === cat ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                background: activeCategory === cat ? 'rgba(124,58,237,0.2)' : 'transparent',
                color: activeCategory === cat ? '#a78bfa' : '#94a3b8',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              className="card"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>{skill.category}</div>
                  </div>
                </div>
                <span style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: 'Space Grotesk',
                  color: skill.level >= 85 ? '#10b981' : skill.level >= 70 ? '#f59e0b' : '#94a3b8',
                }}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: 6,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    borderRadius: 50,
                    background: skill.level >= 85
                      ? 'linear-gradient(90deg, #7c3aed, #10b981)'
                      : skill.level >= 70
                      ? 'linear-gradient(90deg, #7c3aed, #f59e0b)'
                      : 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ marginTop: '3rem', textAlign: 'center' }}
        >
          <p style={{ color: '#475569', marginBottom: '1rem', fontSize: '0.875rem' }}>Also familiar with:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {['Redux', 'GraphQL', 'Socket.io', 'Jest', 'Cypress', 'Linux', 'Nginx', 'Prisma', 'Stripe', 'Vercel'].map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
