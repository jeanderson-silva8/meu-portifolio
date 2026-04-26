/* ═══════════════════════════════════════════════════════════
   ProjectFilters — Animated category filter bar
   Uses Framer Motion for smooth pill button transitions
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { FILTER_CATEGORIES } from '../data/projects';

export default function ProjectFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="project-filters">
      {FILTER_CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`project-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
          onClick={() => onFilterChange(cat.key)}
        >
          {activeFilter === cat.key && (
            <motion.span
              className="project-filter-bg"
              layoutId="activeFilter"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="project-filter-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
