/* ═══════════════════════════════════════════════════════════
   ProjectCard — Masonry card with hover overlay
   ═══════════════════════════════════════════════════════════ */
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import DeviceMockup from './DeviceMockup';
import { TechTag, Badge } from './TechTag';

const GithubIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);

  // Floating animation for mockup
  useEffect(() => {
    if (!cardRef.current) return;
    const mockupEl = cardRef.current.querySelector('.card-mockup-wrap');
    if (!mockupEl) return;

    const ctx = gsap.context(() => {
      gsap.to(mockupEl, {
        y: -5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      });
    });
    return () => ctx.revert();
  }, []);

  const sizeClass = project.size === 'large' ? 'card-large' : 'card-small';

  return (
    <motion.div
      ref={cardRef}
      className={`project-card-v2 ${sizeClass}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Mockup area */}
      <div className="card-mockup-area">
        <div className="card-mockup-wrap">
          <DeviceMockup type={project.mockupType} src={project.screenshotUrl} mobileSrc={project.mobileScreenshotUrl} alt={project.title} />
        </div>
        
        {/* Hover overlay (now only over image) */}
        <div className="card-hover-overlay">
          <div className="card-hover-content">
            <div className="card-hover-badges">
              {project.badges.map(b => <Badge key={b} label={b} />)}
            </div>
            <div className="card-hover-actions">
              <a href={project.liveUrl} className="card-action-btn" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink size={14} />
                Live
              </a>
              <a href={project.codeUrl} className="card-action-btn" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <GithubIcon size={14} />
                Code
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Info (resting state) */}
      <div className="card-info">
        <span className="card-index-label">Projeto {(index + 1).toString().padStart(2, '0')}</span>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <div className="card-all-tags">
          {project.allTags.map(t => <TechTag key={t} label={t} />)}
        </div>
      </div>
    </motion.div>
  );
}
