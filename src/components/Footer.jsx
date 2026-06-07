import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '3rem 0 2rem',
      background: 'var(--bg-secondary)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'white',
            }}>
              A
            </div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem' }}>
              Alex<span style={{ color: '#7c3aed' }}>.</span>dev
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#a78bfa'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ y: -2 }}
                style={{
                  padding: '0.5rem 0.875rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>

        <div style={{
          height: 1,
          background: 'rgba(255,255,255,0.06)',
          marginBottom: '1.5rem',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: '#475569', fontSize: '0.8rem' }}>
            © 2024 Alex Nguyen. Crafted with ❤️ and lots of coffee.
          </p>
          <p style={{ color: '#475569', fontSize: '0.8rem' }}>
            Built with React + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
