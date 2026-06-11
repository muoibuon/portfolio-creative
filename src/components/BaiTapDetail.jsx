import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { baiTapList } from '../data/baiTapData';

function Stars({ value, color }) {
  return (
    <span style={{ display: 'inline-flex', gap: '0.15rem' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{
          fontSize: '0.85rem',
          color: i <= value ? color : 'rgba(255,255,255,0.15)',
          filter: i <= value ? `drop-shadow(0 0 4px ${color}80)` : 'none',
        }}>★</span>
      ))}
    </span>
  );
}

function Block({ children, color, delay = 0, style = {} }) {
  const rgb = hexToRgb(color);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      style={{
        padding: '1.2rem 1.5rem',
        background: `rgba(${rgb},0.08)`,
        border: `1px solid rgba(${rgb},0.3)`,
        borderRadius: 12,
        backdropFilter: 'blur(12px)',
        marginBottom: '1.25rem',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ color, children }) {
  return (
    <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', color, marginBottom: '0.8rem' }}>
      {children}
    </p>
  );
}

export default function BaiTapDetail() {
  const { id } = useParams();
  const bai = baiTapList.find(b => b.id === parseInt(id));
  if (!bai) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
      <p>Không tìm thấy bài tập.</p>
    </div>
  );
  const rgb = hexToRgb(bai.color);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5.5rem 1rem 3rem', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: 760, position: 'relative', zIndex: 1 }}>

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/du-an" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '1.5rem' }}
            onMouseEnter={e => e.currentTarget.style.color = bai.color}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >← Quay lại Dự án</Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '1.75rem' }}>
          <p style={{ color: bai.color, fontWeight: 600, letterSpacing: '0.15em', fontSize: '0.72rem', marginBottom: '0.4rem' }}>— {bai.label.toUpperCase()} —</p>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, lineHeight: 1.2 }}>
            <span style={{ marginRight: '0.5rem' }}>{bai.icon}</span>{bai.title}
          </h1>
        </motion.div>

        {/* ── Bảng đánh giá ── */}
        <Block color={bai.color} delay={0.1}>
          <SectionLabel color={bai.color}>ĐÁNH GIÁ ĐỘ HỮU ÍCH</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {bai.stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '0.83rem', color: '#cbd5e1', minWidth: 220 }}>{s.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Stars value={s.value} color={bai.color} />
                  <span style={{ fontSize: '0.72rem', color: `rgba(${rgb},0.8)`, fontWeight: 700, minWidth: 28 }}>{s.value}/5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Block>

        {/* ── Tóm tắt các bước ── */}
        <Block color={bai.color} delay={0.2} style={{ borderLeft: `3px solid ${bai.color}`, borderRadius: '0 12px 12px 0', background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.35)`, borderLeft: `3px solid ${bai.color}` }}>
          <SectionLabel color={bai.color}>TÓM TẮT CÁC BƯỚC THỰC HIỆN</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {bai.steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: bai.color, background: `rgba(${rgb},0.15)`, padding: '0.2rem 0.5rem', borderRadius: 6, flexShrink: 0, marginTop: '0.1rem', letterSpacing: '0.05em' }}>{s.step}</span>
                <div>
                  <p style={{ fontSize: '0.83rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>{s.title}</p>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Block>

        {/* ── Ảnh minh chứng ── */}
        {bai.images && bai.images.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', color: bai.color, marginBottom: '0.8rem' }}>ẢNH MINH CHỨNG</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              {bai.images.map((src, i) => (
                <div key={i} style={{ width: '75%', borderRadius: 10, overflow: 'hidden', boxShadow: `0 0 0 2.5px rgba(${rgb},0.75), 0 4px 24px rgba(0,0,0,0.5), 0 0 100px rgba(${rgb},0.3), 0 0 40px rgba(${rgb},0.4)`, filter: 'brightness(1.08) contrast(1.05)' }}>
                  <img src={src} alt={`Minh chứng bài ${bai.id} - ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Tiêu chí đánh giá ── */}
        <Block color={bai.color} delay={0.45} style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.4)`, borderLeft: `3px solid ${bai.color}`, borderRadius: '0 12px 12px 0' }}>
          <SectionLabel color={bai.color}>TIÊU CHÍ ĐÁNH GIÁ</SectionLabel>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.6rem' }}>{bai.rubricTitle}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {bai.rubricItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                <span style={{ color: bai.color, flexShrink: 0 }}>▸</span>{item}
              </li>
            ))}
          </ul>
        </Block>

        {/* ── Đã học được gì ── */}
        <Block color={bai.color} delay={0.55}>
          <SectionLabel color={bai.color}>ĐÃ HỌC ĐƯỢC SAU BÀI TẬP NÀY</SectionLabel>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {bai.hocDuoc.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.07 }}
                style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.65 }}>
                <span style={{ color: bai.color, flexShrink: 0, marginTop: '0.1rem' }}>✦</span>{item}
              </motion.li>
            ))}
          </ul>
        </Block>

        {/* ── Tài liệu tham khảo ── */}
        {bai.references && bai.references.length > 0 && (
          <Block color={bai.color} delay={0.65}>
            <SectionLabel color={bai.color}>TÀI LIỆU THAM KHẢO</SectionLabel>
            <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {bai.references.map((ref, i) => (
                <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.04 }}
                  style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  {ref}
                </motion.li>
              ))}
            </ol>
          </Block>
        )}

        {/* ── Download ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a href={`/files/${bai.file}.pdf`} download
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 2rem', background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.4)`, borderRadius: 50, color: bai.color, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em', transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(${rgb},0.22)`; e.currentTarget.style.boxShadow = `0 0 30px rgba(${rgb},0.35)`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = `rgba(${rgb},0.1)`; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
          >↓ Tải file bài tập</a>
        </motion.div>

      </div>
    </section>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
