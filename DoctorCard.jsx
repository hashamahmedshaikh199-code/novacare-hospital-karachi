import { Link } from 'react-router-dom';
import { Star, Mail, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDepartmentById } from '../data/departments.js';

function initials(name) {
  return name.replace('Dr. ', '').split(' ').map((n) => n[0]).slice(0, 2).join('');
}

export default function DoctorCard({ doctor, index = 0 }) {
  const dept = getDepartmentById(doctor.department);
  return (
    <motion.div
      className="doc-card card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="doc-portrait" aria-hidden="true">{initials(doctor.name)}</div>
      <h3>{doctor.name}</h3>
      <p className="doc-specialty">{doctor.specialty}</p>
      <span className="pill-tag">{dept ? dept.name : doctor.department}</span>

      <div className="doc-meta">
        <span>{doctor.qualification}</span>
        <span>{doctor.experience} Experience</span>
        <span className="doc-rating"><Star size={14} fill="#F5B942" color="#F5B942" /> {doctor.rating.toFixed(1)}</span>
      </div>

      <div className="doc-actions">
        <Link to={`/doctors/${doctor.id}`} className="btn btn-outline-dark btn-sm">View Profile</Link>
        <Link to={`/appointments?doctor=${doctor.id}`} className="btn btn-primary btn-sm">
          <CalendarCheck size={14} /> Book
        </Link>
      </div>
      <a href={`mailto:${doctor.email}`} className="doc-email">
        <Mail size={13} /> Email Doctor
      </a>

      <style>{`
        .doc-card { padding: 26px; display: flex; flex-direction: column; gap: 8px; }
        .doc-portrait {
          width: 60px; height: 60px; border-radius: 16px;
          background: var(--grad-accent); color: var(--white);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 600; font-size: 1.15rem;
          margin-bottom: 6px;
        }
        .doc-card h3 { font-size: 1.05rem; }
        .doc-specialty { color: var(--blue-dim); font-size: 0.88rem; font-weight: 600; }
        .doc-card .pill-tag { width: fit-content; margin: 2px 0 6px; }
        .doc-meta { display: flex; flex-direction: column; gap: 4px; color: var(--text-soft); font-size: 0.82rem; margin-bottom: 8px; }
        .doc-rating { display: flex; align-items: center; gap: 4px; color: var(--text); font-weight: 600; }
        .doc-actions { display: flex; gap: 10px; margin-top: auto; }
        .doc-actions .btn { flex: 1; }
        .doc-email { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--text-faint); margin-top: 10px; }
        .doc-email:hover { color: var(--blue); }
      `}</style>
    </motion.div>
  );
}
