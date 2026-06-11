import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import useTilt from '../hooks/useTilt';

const projects = [
  {
    id: 1,
    file: 'Bai_1',
    label: 'Bài tập 1',
    title: 'Máy tính và các thiết bị ngoại vi',
    goal: 'Nắm vững kiến trúc phần cứng, nguyên lý hoạt động của máy tính và vai trò của các thiết bị ngoại vi.',
    summary: 'Phân tích các thành phần cốt lõi của hệ thống máy tính và cách thức tương tác. Đánh giá, thiết lập tiêu chí lựa chọn cấu hình phần cứng tối ưu.',
    color: '#06b6d4',
    icon: '💻',
  },
  {
    id: 2,
    file: 'Bai_2',
    label: 'Bài tập 2',
    title: 'Khai thác dữ liệu và thông tin',
    goal: 'Áp dụng các phương pháp tìm kiếm nâng cao để thu thập, phân loại và đánh giá dữ liệu.',
    summary: 'Thực hành sử dụng toán tử tìm kiếm chuyên sâu, trích xuất thông tin từ cơ sở dữ liệu học thuật. Xây dựng quy trình lọc và kiểm chứng thông tin.',
    color: '#7c3aed',
    icon: '🔍',
  },
  {
    id: 3,
    file: 'Bai_3',
    label: 'Bài tập 3',
    title: 'Tổng quan về trí tuệ nhân tạo',
    goal: 'Củng cố các khái niệm nền tảng về AI, thuật toán cơ bản và phạm vi ứng dụng.',
    summary: 'Khảo sát sự phát triển của hệ sinh thái AI, phân tích cơ chế học máy (Machine Learning) và cách AI tối ưu hóa năng suất.',
    color: '#ec4899',
    icon: '🤖',
  },
  {
    id: 4,
    file: 'Bai_4',
    label: 'Bài tập 4',
    title: 'Giao tiếp và hợp tác trong môi trường số',
    goal: 'Vận dụng nền tảng số để thiết lập quy trình làm việc nhóm hiệu quả và giao tiếp chuyên nghiệp.',
    summary: 'Triển khai công cụ quản lý dự án và không gian làm việc chung. Thực hành phân chia công việc, đồng bộ dữ liệu và quản lý phiên bản từ xa.',
    color: '#10b981',
    icon: '🤝',
  },
  {
    id: 5,
    file: 'Bai_5',
    label: 'Bài tập 5',
    title: 'Sáng tạo nội dung số',
    goal: 'Sử dụng thành thạo các công cụ số để thiết kế, biên tập và trình bày thông tin đa phương tiện.',
    summary: 'Ứng dụng nền tảng thiết kế trực quan và AI tạo sinh để chuyển đổi ý tưởng, dữ liệu thô thành sản phẩm có thẩm mỹ và cấu trúc rõ ràng.',
    color: '#f59e0b',
    icon: '✨',
  },
  {
    id: 6,
    file: 'Bai_6',
    label: 'Bài tập 6',
    title: 'An toàn và liêm chính học thuật trong môi trường số',
    goal: 'Nhận diện rủi ro bảo mật và tuân thủ nghiêm ngặt các nguyên tắc đạo đức, bản quyền học thuật.',
    summary: 'Đánh giá phương thức bảo vệ dữ liệu. Thực hành tiêu chuẩn trích dẫn và thảo luận về ranh giới liêm chính khi dùng công cụ tự động hóa.',
    color: '#8b5cf6',
    icon: '🔐',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const tilt = useTilt(6);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        data-hover
        style={{
          position: 'relative',
          padding: '0.9rem 1rem',
          borderRadius: 12,
          background: 'rgba(22, 22, 31, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid rgba(255,255,255,0.08)`,
          overflow: 'hidden',
          transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          cursor: 'default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${project.color}50`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Glass shimmer top */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        }} />

        {/* Color accent top-left */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 3,
          height: '100%',
          background: `linear-gradient(to bottom, ${project.color}, transparent)`,
          borderRadius: '16px 0 0 16px',
        }} />

        {/* Number + icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', color: project.color, opacity: 0.8 }}>
            {project.label.toUpperCase()}
          </span>
          <span style={{ fontSize: '1.2rem' }}>{project.icon}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3, color: '#f1f5f9' }}>
          {project.title}
        </h3>

        {/* Goal */}
        <div style={{ marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: project.color, letterSpacing: '0.08em' }}>MỤC TIÊU</span>
          <p style={{ color: '#94a3b8', fontSize: '0.73rem', lineHeight: 1.5, marginTop: '0.15rem' }}>
            {project.goal}
          </p>
        </div>

        {/* Summary */}
        <div style={{ flex: 1, marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(167,139,250,0.8)', letterSpacing: '0.08em' }}>TÓM TẮT</span>
          <p style={{ color: '#64748b', fontSize: '0.73rem', lineHeight: 1.5, marginTop: '0.15rem' }}>
            {project.summary}
          </p>
        </div>

        {/* Access button */}
        <Link
          to={`/bai-tap/${project.id}`}
          data-hover
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.85rem',
            background: `${project.color}15`,
            border: `1px solid ${project.color}40`,
            borderRadius: 50,
            color: project.color,
            textDecoration: 'none',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            transition: 'all 0.25s ease',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${project.color}30`;
            e.currentTarget.style.boxShadow = `0 0 20px ${project.color}40`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${project.color}15`;
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span>→</span> Truy cập bài tập
        </Link>
      </div>
    </motion.div>
  );
}

export default function CourseProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="course-projects"
      ref={ref}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '4.5rem 0 1rem',
        background: 'rgba(10,10,15,0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p style={{ textAlign: 'center', color: '#06b6d4', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
            — PAGE 02 —
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '0.2rem' }}>
            Dự án &amp; <span style={{ background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bài tập</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Môn Công nghệ Số — Đại học Việt Nhật
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
