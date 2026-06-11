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

const SERIES = [
  { label: 'Tiến bộ kỹ thuật',  color: '#06b6d4', data: [12, 22, 35, 48, 60, 72, 82, 91] },
  { label: 'Khó khăn gặp phải', color: '#f43f5e', data: [85, 78, 83, 68, 56, 48, 38, 28] },
  { label: 'Phát triển tư duy',  color: '#a78bfa', data: [8,  13, 20, 32, 50, 66, 80, 93] },
];

const W = 600, H = 155;
const PL = 28, PR = 16, PT = 10, PB = 26;
const cW = W - PL - PR, cH = H - PT - PB;
const xS = i => PL + (i / 7) * cW;
const yS = v => PT + cH - (v / 100) * cH;
const toD = data => data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xS(i).toFixed(1)},${yS(v).toFixed(1)}`).join(' ');

function ProgressChart({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.85, duration: 0.55 }}
    >
      <div style={{
        margin: 0, padding: '0.9rem 1.5rem',
        background: 'rgba(6,182,212,0.04)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(6,182,212,0.15)', borderLeft: '3px solid #06b6d4',
        borderRadius: '0 12px 12px 0',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4', letterSpacing: '0.12em', marginBottom: '0.5rem', opacity: 0.8 }}>TIẾN TRÌNH HỌC TẬP — 8 TUẦN</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
          {/* Horizontal grid */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line x1={PL} y1={yS(v)} x2={W - PR} y2={yS(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={PL - 4} y={yS(v) + 3.5} textAnchor="end" fill="rgba(148,163,184,0.4)" fontSize="8">{v}</text>
            </g>
          ))}
          {/* Vertical grid */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={xS(i)} y1={PT} x2={xS(i)} y2={PT + cH} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}
          {/* X labels */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <text key={i} x={xS(i)} y={H - 4} textAnchor="middle" fill="rgba(148,163,184,0.5)" fontSize="8.5">T{i+1}</text>
          ))}
          {/* Glow */}
          {SERIES.map((s, si) => (
            <motion.path key={s.label + '-glow'} d={toD(s.data)}
              fill="none" stroke={s.color} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 1.0 + si * 0.25, duration: 1.4, ease: 'easeInOut' }}
            />
          ))}
          {/* Lines — strokeWidth 1.35 (2 × 2/3) */}
          {SERIES.map((s, si) => (
            <motion.path key={s.label} d={toD(s.data)}
              fill="none" stroke={s.color} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 1.0 + si * 0.25, duration: 1.4, ease: 'easeInOut' }}
            />
          ))}
          {/* Dots */}
          {SERIES.map((s, si) =>
            s.data.map((v, i) => (
              <motion.circle key={`${s.label}-${i}`} cx={xS(i)} cy={yS(v)} r="3"
                fill={s.color} style={{ filter: `drop-shadow(0 0 3px ${s.color})` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.2 + si * 0.25 + i * 0.06, duration: 0.25 }}
              />
            ))
          )}
        </svg>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.4rem', justifyContent: 'center', marginTop: '0.25rem' }}>
          {SERIES.map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 18, height: 2, background: s.color, borderRadius: 2, boxShadow: `0 0 5px ${s.color}70` }} />
              <span style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.04em' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 0 2rem',
        position: 'relative',
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
          style={{ textAlign: 'center', color: '#06b6d4', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.2rem', fontSize: '0.72rem' }}
        >
          — PAGE 03 —
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '0.8rem' }}
        >
          <HolographicText>Lời kết</HolographicText>
        </motion.h2>

        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

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
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4', letterSpacing: '0.12em', marginBottom: '0.4rem', opacity: 0.8 }}>TRẢI NGHIỆM VỚI CÔNG CỤ SỐ</div>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(6,182,212,0.2)', fontFamily: 'Georgia, serif', marginBottom: '0.4rem' }}>"</div>
            <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', lineHeight: 1.65, fontWeight: 500, color: '#e2e8f0', fontStyle: 'italic' }}>
              <HolographicText delay={0.5}>
                Nhờ những công cụ số tiên tiến và thân thiện với người dùng ngày nay, việc mình thực hiện Portfolio này trở nên thật sự dễ dàng và trực quan. Mình có thể tự do sắp xếp bố cục, tinh chỉnh hình ảnh và kể câu chuyện của bản thân một cách có hệ thống. Chính điều này đã biến một dự án vốn phức tạp thành một trải nghiệm sáng tạo đầy hứng thú, ít áp lực hơn rất nhiều so với dự kiến ban đầu.
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
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.12em', marginBottom: '0.4rem', opacity: 0.8 }}>GIÁ TRỊ CỦA KIẾN THỨC TÍCH LŨY</div>
            <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', lineHeight: 1.65, fontWeight: 500, color: '#e2e8f0', fontStyle: 'italic', marginBottom: '0.4rem' }}>
              <HolographicText delay={0.7}>
                Trong suốt quá trình làm việc, có vô vàn những kiến thức quý giá mà mình đã may mắn tích lũy được, từ tư duy thiết kế tối ưu cho đến kỹ thuật truyền tải thông điệp bằng thị giác. Mỗi một mảng kiến thức ấy đều thực sự quan trọng, không chỉ giúp mình hoàn thiện sản phẩm hiện tại mà còn là nền tảng vững chắc cho sự phát triển nghề nghiệp trong tương lai.
              </HolographicText>
            </p>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(124,58,237,0.2)', fontFamily: 'Georgia, serif' }}>"</div>
          </motion.blockquote>

          {/* Chart */}
          <ProgressChart isInView={isInView} />

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
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f0abfc', letterSpacing: '0.12em', marginBottom: '0.4rem', opacity: 0.8 }}>THẤU HIỂU BẢN THÂN VÀ VƯỢT QUA TRỞ NGẠI</div>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', marginBottom: '0.4rem' }}>"</div>
            <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', lineHeight: 1.65, fontStyle: 'italic' }}>
              <HolographicText delay={0.9}>
                Tớ thật sự rất tâm đắc với hành trình thấu hiểu bản thân sâu sắc hơn, từ việc định vị thương hiệu cá nhân cho đến cách lồng ghép cái tôi vào từng trang web. Nó không chỉ dừng lại ở việc kiên trì vượt qua những trở ngại kỹ thuật hay lỗi giao diện phát sinh, mà quan trọng hơn cả là sự tự tin để kiến tạo nên một portfolio phản ánh chân thực nhất con người và những giá trị mà tớ luôn theo đuổi.
              </HolographicText>
            </p>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', marginTop: '0.4rem', textAlign: 'right' }}>"</div>
          </motion.div>


          {/* Quote 4 — Future application */}
          <motion.blockquote
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.7 }}
            style={{
              margin: 0, padding: '0.9rem 1.5rem',
              background: 'rgba(16,185,129,0.04)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16,185,129,0.15)', borderLeft: '3px solid #10b981',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.12em', marginBottom: '0.4rem', opacity: 0.8 }}>ỨNG DỤNG KỸ NĂNG VÀO TƯƠNG LAI</div>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(16,185,129,0.2)', fontFamily: 'Georgia, serif', marginBottom: '0.4rem' }}>"</div>
            <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', lineHeight: 1.75, fontWeight: 500, color: '#e2e8f0', fontStyle: 'italic' }}>
              <HolographicText delay={1.1}>
                Nhìn lại hành trình qua môn Công nghệ Số, mình nhận ra rằng từng kỹ năng tích lũy không chỉ là bài nộp — chúng là nền móng thực sự cho con đường phía trước. Kỹ năng tổ chức tệp tin và quy tắc đặt tên khoa học sẽ trực tiếp phục vụ việc quản lý hàng nghìn file dataset và paper nghiên cứu khi mình theo đuổi chương trình MSc/PhD tại Đại học Toronto. Prompt Engineering và tư duy phản biện về AI sẽ là lợi thế cạnh tranh trong môi trường nghiên cứu Machine Learning quốc tế. Kinh nghiệm vận hành các kênh nội dung IT (TikTok 117K, YouTube 92K) kết hợp kỹ năng giao tiếp số từ môn học này sẽ giúp mình truyền tải nghiên cứu phức tạp thành nội dung dễ tiếp cận — năng lực mà giới học thuật hiện đại đang rất cần. Môn Công nghệ Số không dạy mình dùng phần mềm — nó dạy mình tư duy hệ thống trong môi trường số, và đó chính là thứ mình sẽ mang theo suốt sự nghiệp.
              </HolographicText>
            </p>
            <div style={{ fontSize: '2rem', lineHeight: 0.6, color: 'rgba(16,185,129,0.2)', fontFamily: 'Georgia, serif', marginTop: '0.4rem', textAlign: 'right' }}>"</div>
          </motion.blockquote>

        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '0.6rem' }}
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
