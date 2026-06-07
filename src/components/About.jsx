import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats } from '../data/portfolio';

function AnimatedNumber({ end, duration = 2.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            WHO I AM
          </p>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            A developer who loves crafting great digital experiences
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: '100%',
              maxWidth: 400,
              aspectRatio: '1',
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
              border: '1px solid rgba(124,58,237,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto',
            }}>
              {/* Code snippet decoration */}
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#475569',
                lineHeight: 1.8,
                padding: '2rem',
                width: '100%',
              }}>
                {[
                  { code: 'const developer = {', color: '#94a3b8' },
                  { code: "  name: 'Alex Nguyen',", color: '#10b981' },
                  { code: "  role: 'Full Stack Dev',", color: '#10b981' },
                  { code: "  passion: ['code', 'design'],", color: '#f59e0b' },
                  { code: "  coffee: Infinity,", color: '#ec4899' },
                  { code: "  available: true,", color: '#06b6d4' },
                  { code: '};', color: '#94a3b8' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ color: line.color }}
                  >
                    {line.code}
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner elements */}
              <div style={{
                position: 'absolute',
                top: 16, right: 16,
                width: 12, height: 12,
                borderTop: '2px solid #7c3aed',
                borderRight: '2px solid #7c3aed',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 16, left: 16,
                width: 12, height: 12,
                borderBottom: '2px solid #ec4899',
                borderLeft: '2px solid #ec4899',
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                bottom: -16,
                right: 20,
                background: 'var(--bg-card)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 12,
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>☕</span>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#475569' }}>Powered by</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>Coffee & Code</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
              Turning ideas into{' '}
              <span className="gradient-text">remarkable</span> digital products
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {personalInfo.bio}
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem' }}>
              When I'm not coding, you'll find me exploring new design trends,
              contributing to open source, or mentoring aspiring developers. I believe
              great software is born at the intersection of technical excellence and
              thoughtful user experience.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['📍 HCM City, Vietnam', '🎓 Computer Science', '☕ Coffee Addict', '🎮 Gamer'].map(item => (
                <span key={item} style={{
                  padding: '0.375rem 0.875rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.5rem',
          marginTop: '5rem',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="card"
              style={{ padding: '1.5rem', textAlign: 'center' }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                fontFamily: 'Space Grotesk',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {isInView ? (
                  <span className="gradient-text">
                    <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                  </span>
                ) : (
                  <span className="gradient-text">0{stat.suffix}</span>
                )}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
