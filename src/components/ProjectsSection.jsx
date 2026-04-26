/* ═══════════════════════════════════════════════════════════
   ProjectsSection — Complete rebuilt projects section
   Implements all 5 improvements:
   1. Asymmetric masonry layout
   2. Device mockups instead of raw screenshots
   3. Animated category filters
   4. Expand-on-hover cards
   5. Alternating split layout for premium projects
   ═══════════════════════════════════════════════════════════ */
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsSection.css';
import { PROJECTS_DATA } from '../data/projects';
import ProjectFilters from './ProjectFilters';
import PremiumProject from './PremiumProject';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Separate premium projects from the rest
  const premiumProjects = PROJECTS_DATA.filter(p => p.size === 'premium');
  const gridProjects = PROJECTS_DATA.filter(p => p.size !== 'premium');

  // Filter grid projects based on active filter
  const filteredGridProjects = activeFilter === 'all'
    ? gridProjects
    : gridProjects.filter(p => p.category === activeFilter);

  // Also filter premium based on category
  const filteredPremium = activeFilter === 'all'
    ? premiumProjects
    : premiumProjects.filter(p => p.category === activeFilter);

  // GSAP entrance for section title
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.pjs-section-label', {
        scrollTrigger: { trigger: '.pjs-section-header', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
      });
      gsap.from('.pjs-section-title', {
        scrollTrigger: { trigger: '.pjs-section-header', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.pjs-section-subtitle', {
        scrollTrigger: { trigger: '.pjs-section-header', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section-v2" id="projetos" ref={sectionRef}>
      {/* Section header */}
      <div className="pjs-section-header section-header" ref={headerRef}>
        <span className="pjs-section-label section-label">// Portfólio</span>
        <h2 className="pjs-section-title section-title">Projetos em Destaque</h2>
        <p className="pjs-section-subtitle section-subtitle">
          Cada projeto é uma jornada — do conceito ao deploy, com desafios únicos
        </p>
      </div>

      {/* Filter bar */}
      <ProjectFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Premium projects — split layout */}
      <AnimatePresence mode="popLayout">
        {filteredPremium.length > 0 && (
          <motion.div
            className="premium-projects-container"
            key="premium-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPremium.map((project, i) => (
              <PremiumProject key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient divider */}
      {filteredPremium.length > 0 && filteredGridProjects.length > 0 && (
        <div className="projects-divider">
          <div className="projects-divider-line" />
        </div>
      )}

      {/* Masonry grid */}
      <motion.div className="masonry-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredGridProjects.map((project) => {
            const absoluteIndex = PROJECTS_DATA.findIndex(p => p.id === project.id);
            return <ProjectCard key={project.id} project={project} index={absoluteIndex} />;
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
