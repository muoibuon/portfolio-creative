import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function HolographicText({ children, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{
        background: 'linear-gradient(135deg, #67e8f9 0%, #a78bfa 30%, #f0abfc 60%, #93c5fd 80%, #67e8f9 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'holoshimmer 4s linear infinite',
        display: 'inline',
      }}
    >
      {children}
    </motion.span>
  );
}

export default function Summary() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="summary"
      ref={ref}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 0 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', color: '#06b6d4', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.3rem', fontSize: '0.75rem' }}
        >
          — PAGE 03 —
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1.5rem' }}
        >
          <HolographicText>Lời kết</HolographicText>
        </motion.h2>

        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Quote 1 */}
          <motion.blockquote
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{
              margin: 0, padding: '0.9rem 1.5rem',
              background: 'rgba(6,182,212,0.04)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(6,182,212,0.15)', borderLeft: '3px solid #06b6d4',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <div style={{ fontSize: '2.5rem', lineHeight: 0.6, color: 'rgba(6,182,212,0.2)', fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>"</div>
            <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', lineHeight: 1.6, fontWeight: 500, color: '#e2e8f0', fontStyle: 'italic' }}>
              <HolographicText delay={0.5}>
                Nhờ những công cụ số mà mình thực hiện Portfolio này thật dễ dàng !
              </HolographicText>
            </p>
          </motion.blockquote>

          {/* Quote 2 */}
          <motion.blockquote
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{
              margin: 0, padding: '0.9rem 1.5rem',
              background: 'rgba(124,58,237,0.04)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.15)', borderRight: '3px solid #7c3aed',
              borderRadius: '12px 0 0 12px', textAlign: 'right',
            }}
          >
            <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', lineHeight: 1.6, fontWeight: 500, color: '#e2e8f0', fontStyle: 'italic', marginBottom: '0.5rem' }}>
              <HolographicText delay={0.7}>
                Có vô vàn những kiến thức mình đã học được và kiến thức nào cũng thật sự quan trọng đối với mình.
              </HolographicText>
            </p>
            <div style={{ fontSize: '2.5rem', lineHeight: 0.6, color: 'rgba(124,58,237,0.2)', fontFamily: 'Georgia, serif' }}>"</div>
          </motion.blockquote>

          {/* Quote 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{
              padding: '0.9rem 1.5rem',
              background: 'rgba(103,232,249,0.03)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(167,139,250,0.2)',
              borderTop: '3px solid transparent',
              borderImage: 'linear-gradient(90deg,#67e8f9,#a78bfa,#f0abfc) 1',
              borderRadius: 12, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', lineHeight: 0.6, color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>"</div>
            <p style={{ fontSize: 'clamp(0.82rem, 1.6vw, 1rem)', lineHeight: 1.7, fontStyle: 'italic' }}>
              <HolographicText delay={0.9}>
                Tớ thật sự rất tâm đắc việc hiểu bản thân, vượt qua những trở ngại khi lỗi trang để tạo nên 1 portfolio cho riêng mình.
              </HolographicText>
            </p>
            <div style={{ fontSize: '2.5rem', lineHeight: 0.6, color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', marginTop: '0.5rem', textAlign: 'right' }}>"</div>
          </motion.div>
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '1.25rem' }}
        >
          <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '0.25rem' }}>— Trần Ngô Tiến Đạt</p>
          <p style={{ color: '#334155', fontSize: '0.75rem' }}>Khoa học Máy tính · Đại học Việt Nhật</p>
        </motion.div>
      </div>

      <style>{`
        @keyframes holoshimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
