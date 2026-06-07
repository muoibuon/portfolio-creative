import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import avatarImg from '../assets/avatar.png';
import useTilt from '../hooks/useTilt';
import { TypeAnimation } from 'react-type-animation';

export default function AboutCourse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const tilt = useTilt(8);

  return (
    <section
      id="about-course"
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
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', color: '#06b6d4', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.75rem', fontSize: '0.75rem' }}
        >
          — PAGE 01 —
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '2.5rem',
          alignItems: 'center',
        }}
          className="about-grid"
        >
          {/* LEFT — Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              data-hover
              style={{ position: 'relative', width: 200, height: 200, borderRadius: '50%', transition: 'transform 0.1s ease', cursor: 'default' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'conic-gradient(#06b6d4, #7c3aed, #ec4899, #06b6d4)', zIndex: 0 }}
              />
              <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-card)' }}>
                <img
                  src={avatarImg}
                  alt="Trần Ngô Tiến Đạt"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', clipPath: 'circle(48% at 50% 46%)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              <TypeAnimation
                sequence={["Xin chào! Mình là Trần Ngô Tiến Đạt", 99999]}
                wrapper="span"
                speed={60}
                cursor={true}
                style={{ display: 'inline-block' }}
              />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{ color: '#94a3b8', lineHeight: 1.65, marginBottom: '0.75rem', fontSize: '0.85rem', borderLeft: '2px solid rgba(6,182,212,0.4)', paddingLeft: '1rem' }}
            >
              Mình là sinh viên Khoa học Máy tính tại Việt Nam, với nền tảng vững chắc về Tài chính
              Định lượng và Học máy. Mình đang tích cực chuẩn bị cho việc học sau đại học, hướng
              tới chương trình nghiên cứu MSc/PhD tại Đại học Toronto (UofT). Hồ sơ này là portfolio
              học thuật toàn diện, bao gồm các bài tập khóa học, dự án nghiên cứu độc lập và các
              thử nghiệm thuật toán, phản ánh cam kết học hỏi liên tục và xuất sắc về mặt kỹ thuật.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{ color: '#94a3b8', lineHeight: 1.65, fontSize: '0.85rem', borderLeft: '2px solid rgba(124,58,237,0.4)', paddingLeft: '1rem' }}
            >
              Mục tiêu của portfolio này: Để mọi người hiểu hơn về những kỹ năng mà mình có
              cũng như trình bày các sản phẩm trong môn Công nghệ Số.
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.1rem' }}
            >
              {['Sinh viên CNTT', 'Hướng tới UofT', 'ML/AI', 'Tài chính định lượng', 'VJU'].map(tag => (
                <span key={tag} style={{
                  padding: '0.2rem 0.75rem',
                  border: '1px solid rgba(6,182,212,0.35)',
                  background: 'rgba(6,182,212,0.07)',
                  borderRadius: 50,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#67e8f9',
                  letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; text-align: center; }
          .about-grid > div:first-child { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
