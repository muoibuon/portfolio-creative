import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('featured');
  const [hovered, setHovered] = useState(null);

  const filtered = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section id="projects" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            MY WORK
          </p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Things I've built that I'm proud of
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}
        >
          {['featured', 'all'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: 50,
                border: '1px solid',
                borderColor: filter === f ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                background: filter === f ? 'rgba(124,58,237,0.2)' : 'transparent',
                color: filter === f ? '#a78bfa' : '#94a3b8',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {f === 'featured' ? '⭐ Featured' : '🗂 All Projects'}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setHovered(project.id)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: hovered === project.id
                    ? `${project.color}40`
                    : 'rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease',
                  transform: hovered === project.id ? 'translateY(-6px)' : 'none',
                  boxShadow: hovered === project.id
                    ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}20`
                    : 'none',
                }}
              >
                {/* Project header / image */}
                <div style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={hovered === project.id ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.image}
                  </motion.div>

                  {/* Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 70%)`,
                  }} />

                  {/* Top right links - show on hover */}
                  <AnimatePresence>
                    {hovered === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: 'absolute',
                          top: 12, right: 12,
                          display: 'flex',
                          gap: '0.5rem',
                        }}
                      >
                        {[
                          { label: 'GitHub', href: project.github, icon: '⬛' },
                          { label: 'Demo', href: project.demo, icon: '🔗' },
                        ].map(link => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.375rem 0.75rem',
                              background: 'rgba(10,10,15,0.8)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: 8,
                              color: '#f8fafc',
                              textDecoration: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            {link.icon} {link.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.2rem 0.6rem',
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}30`,
                          borderRadius: 50,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: project.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            Want to see more? Check out my GitHub for all projects.
          </p>
          <a href="#" target="_blank" className="btn-outline">
            View All on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
