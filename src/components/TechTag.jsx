/* ═══════════════════════════════════════════════════════════
   TechTag & Badge — Reusable pill components
   ═══════════════════════════════════════════════════════════ */

export function TechTag({ label }) {
  return (
    <span className="tech-tag-pill">{label}</span>
  );
}

export function Badge({ label }) {
  return (
    <span className="badge-pill">{label}</span>
  );
}
