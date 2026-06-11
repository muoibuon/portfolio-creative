import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Về tôi',  to: '/' },
  { label: 'Dự án',   to: '/du-an' },
  { label: 'Lời kết', to: '/loi-ket' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1rem', color: 'white',
            }}>T</div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#f8fafc' }}>
              Tiến Đạt<span style={{ color: '#7c3aed' }}>.</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link, i) => {
            const active = pathname === link.to;
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to={link.to}
                  data-hover
                  style={{
                    display: 'block',
                    color: active ? '#a78bfa' : '#94a3b8',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 500,
                    background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                    borderBottom: active ? '2px solid #7c3aed' : '2px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                      e.currentTarget.style.color = '#a78bfa';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}

          {/* Minh chứng — tải PDF + ZIP */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <button
              data-hover
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/downloads/MinhChung_TranNgoTienDat.zip';
                a.download = 'MinhChung_TranNgoTienDat.zip';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              style={{
                display: 'block',
                color: '#06b6d4',
                padding: '0.5rem 0.875rem',
                borderRadius: 8,
                fontSize: '0.875rem',
                fontWeight: 600,
                background: 'rgba(6,182,212,0.1)',
                border: '1px solid rgba(6,182,212,0.35)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(6,182,212,0.2)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(6,182,212,0.3)';
                e.currentTarget.style.color = '#67e8f9';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '#06b6d4';
              }}
            >
              ↓ Minh chứng
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '0.5rem', cursor: 'pointer', color: '#f8fafc', display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10,10,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="container" style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: pathname === link.to ? '#a78bfa' : '#94a3b8',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '1rem',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  const a = document.createElement('a');
                  a.href = '/downloads/MinhChung_TranNgoTienDat.zip';
                  a.download = 'MinhChung_TranNgoTienDat.zip';
                  document.body.appendChild(a); a.click(); document.body.removeChild(a);
                }}
                style={{ color: '#06b6d4', background: 'none', border: 'none', padding: '0.75rem 0', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                ↓ Minh chứng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
