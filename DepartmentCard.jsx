import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DepartmentCard({ department, index = 0 }) {
  const Icon = department.icon;
  return (
    <motion.div
      className="dept-card card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dept-icon"><Icon size={22} strokeWidth={1.8} /></div>
      <h3>{department.name}</h3>
      <p>{department.short}</p>
      <span className="pill-tag">{department.specialists} Specialists</span>
      <Link to={`/departments/${department.id}`} className="dept-link">
        View Department <ArrowRight size={15} />
      </Link>

      <style>{`
        .dept-card { padding: 28px; display: flex; flex-direction: column; gap: 10px; }
        .dept-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: var(--grad-card);
          border: 1px solid rgba(20,121,209,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--blue); margin-bottom: 6px;
        }
        .dept-card h3 { font-size: 1.08rem; }
        .dept-card p { color: var(--text-soft); font-size: 0.92rem; line-height: 1.55; flex-grow: 1; }
        .dept-card .pill-tag { width: fit-content; margin-top: 2px; }
        .dept-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--blue); font-weight: 600; font-size: 0.88rem; margin-top: 10px;
          transition: gap 0.2s;
        }
        .dept-link:hover { gap: 10px; }
      `}</style>
    </motion.div>
  );
}
