import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../data/portfolio';
import avatarImg from '../assets/avatar.png';

const FloatingOrb = ({ style }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.35,
      ...style,
    }}
  />
);

const Particle = ({ delay, left, bottom }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -120],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
    }}
    style={{
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: '#7c3aed',
      left,
      bottom,
    }}
  />
);

export default function Hero() {
  const particles = [
    { delay: 0, left: '10%', bottom: '20%' },
    { delay: 0.5, left: '20%', bottom: '15%' },
    { delay: 1, left: '30%', bottom: '25%' },
    { delay: 1.5, left: '45%', bottom: '10%' },
    { delay: 2, left: '60%', bottom: '20%' },
    { delay: 0.3, left: '70%', bottom: '30%' },
    { delay: 0.8, left: '80%', bottom: '15%' },
    { delay: 1.2, left: '90%', bottom: '25%' },
    { delay: 1.7, left: '5%', bottom: '35%' },
    { delay: 2.2, left: '85%', bottom: '40%' },
  ];

  const firstName = personalInfo.name.split(' ').slice(-1)[0]; // "Đạt"
  const fullName = personalInfo.name; // "Trần Ngô Tiến Đạt"

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Background orbs */}
      <FloatingOrb style={{ width: 600, height: 600, background: '#7c3aed', top: '-10%', left: '-15%' }} />
      <FloatingOrb style={{ width: 400, height: 400, background: '#ec4899', top: '20%', right: '-10%' }} />
      <FloatingOrb style={{ width: 300, height: 300, background: '#06b6d4', bottom: '10%', left: '40%' }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} delay={p.delay} left={p.left} bottom={p.bottom} />
      ))}

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: '7rem',
        paddingBottom: '4rem',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '3rem',
          alignItems: 'center',
          minHeight: '80vh',
        }}
          className="hero-grid"
        >
          {/* LEFT — Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {/* Glow ring behind avatar */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '80%',
                aspectRatio: '1',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                marginTop: '-4%',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)',
                filter: 'blur(40px)',
                opacity: 0.3,
              }}
            />

            {/* Animated gradient border ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '82%',
                aspectRatio: '1',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                marginTop: '-4%',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--bg-primary), var(--bg-primary)), conic-gradient(from 0deg, #7c3aed, transparent 50%, #ec4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                opacity: 0.8,
              }}
            />

            {/* Floating skill badges */}
            {[
              { label: 'Python', icon: '🐍', top: '15%', left: '-5%', delay: 0.5 },
              { label: 'AWS', icon: '☁️', top: '30%', right: '-8%', delay: 0.8 },
              { label: 'Docker', icon: '🐳', bottom: '25%', left: '-8%', delay: 1.1 },
              { label: 'ML/AI', icon: '🧠', bottom: '40%', right: '-5%', delay: 1.4 },
            ].map(badge => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.delay, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                style={{
                  position: 'absolute',
                  top: badge.top,
                  bottom: badge.bottom,
                  left: badge.left,
                  right: badge.right,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.75rem',
                  background: 'rgba(22, 22, 31, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: 50,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <span>{badge.icon}</span>
                {badge.label}
              </motion.div>
            ))}

            {/* Avatar image — fits circular frame, shows full portrait */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '78%',
              }}
            >
              <img
                src={avatarImg}
                alt={personalInfo.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  /* Clip thành hình tròn: chỉ cắt 1 chút dưới cùng (at 50% 45%) */
                  clipPath: 'circle(48% at 50% 46%)',
                  filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.5))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <div style={{ position: 'relative' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 1rem',
                background: 'rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                borderRadius: 50,
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                color: '#a78bfa',
                fontWeight: 500,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}
              />
              Available for work
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1rem',
                letterSpacing: '-0.03em',
              }}
            >
              Hi, I'm{' '}
              <br />
              <span className="gradient-text">{fullName}</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ marginBottom: '1.25rem', minHeight: '2rem' }}
            >
              <TypeAnimation
                sequence={personalInfo.taglines.flatMap(t => [t, 2000])}
                wrapper="span"
                repeat={Infinity}
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  fontWeight: 600,
                  color: '#94a3b8',
                  letterSpacing: '-0.01em',
                }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '1.05rem',
                color: '#94a3b8',
                lineHeight: 1.8,
                maxWidth: 500,
                marginBottom: '2rem',
              }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work ↓
              </motion.a>
              <motion.a
                href={personalInfo.resume}
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <span style={{ color: '#475569', fontSize: '0.875rem' }}>Find me on:</span>
              {[
                { label: 'GitHub', href: personalInfo.github },
                { label: 'LinkedIn', href: personalInfo.linkedin },
                { label: 'Twitter', href: personalInfo.twitter },
              ].map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, color: '#a78bfa' }}
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                >
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ color: '#475569', fontSize: '0.7rem', letterSpacing: '0.15em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #7c3aed, transparent)' }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:first-child {
            order: 1;
            max-height: 380px;
          }
          .hero-grid > div:last-child {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
