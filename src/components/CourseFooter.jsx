export default function CourseFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '3rem 0 2rem',
      background: 'rgba(10,10,15,0.8)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
    }}>
      <div className="container">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'white', fontSize: '1rem',
            }}>T</div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem' }}>
              Trần Ngô Tiến Đạt<span style={{ color: '#06b6d4' }}>.</span>
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem' }}>
            Sinh viên CNTT · Đại học Việt Nhật · Hà Nội, Việt Nam
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: '#334155', fontSize: '0.78rem' }}>
            © 2025 Trần Ngô Tiến Đạt · Portfolio môn Công nghệ Số
          </p>
          <p style={{ color: '#334155', fontSize: '0.78rem' }}>
            Xây dựng bằng React + Framer Motion ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
