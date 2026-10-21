import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Clock, Mail, Siren } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import { getDepartmentById } from '../data/departments.js';
import { getDoctorsByDepartment } from '../data/doctors.js';

export default function DepartmentDetails() {
  const { id } = useParams();
  const department = getDepartmentById(id);

  if (!department) return <Navigate to="/404" replace />;

  const Icon = department.icon;
  const relatedDoctors = getDoctorsByDepartment(department.id);

  return (
    <PageTransition>
      <section className="page-hero dept-hero">
        <div className="container">
          <div className="dept-hero-icon"><Icon size={30} /></div>
          <h1>{department.name}</h1>
          <p>{department.overview}</p>
          <div className="dept-hero-actions">
            <Link to={`/appointments?department=${department.id}`} className="btn btn-primary">Book Appointment</Link>
            <a href={`mailto:${department.email}`} className="btn btn-outline"><Mail size={16} /> Email Department</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container dept-grid">
          <div>
            <h2>Conditions Treated</h2>
            <ul className="check-list">
              {department.conditions.map((c) => (
                <li key={c}><CheckCircle2 size={17} color="#1479D1" /> {c}</li>
              ))}
            </ul>

            <h2 className="mt">Services Provided</h2>
            <ul className="check-list">
              {department.services.map((s) => (
                <li key={s}><CheckCircle2 size={17} color="#35B8C8" /> {s}</li>
              ))}
            </ul>
          </div>

          <aside className="dept-side card">
            <h3>Consultation Hours</h3>
            <p className="dept-hours"><Clock size={16} /> {department.hours}</p>
            <h3 className="mt-sm">Department Email</h3>
            <a href={`mailto:${department.email}`} className="dept-email"><Mail size={15} /> {department.email}</a>
            <div className="dept-emergency-note">
              <Siren size={16} color="#D64545" />
              <span>For urgent conditions, visit our <Link to="/emergency">Emergency Department</Link> directly.</span>
            </div>
          </aside>
        </div>
      </section>

      {relatedDoctors.length > 0 && (
        <section className="section related-doctors">
          <div className="container">
            <h2>Related Doctors</h2>
            <div className="grid-4">
              {relatedDoctors.map((doc, i) => <DoctorCard doctor={doc} index={i} key={doc.id} />)}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .dept-hero { padding: 150px 0 60px; }
        .dept-hero-icon {
          width: 60px; height: 60px; border-radius: 16px;
          background: rgba(255,255,255,0.1); color: var(--cyan);
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .dept-hero h1 { color: var(--white); font-size: clamp(1.9rem, 3.6vw, 2.6rem); margin-bottom: 14px; }
        .dept-hero p { color: rgba(255,255,255,0.78); max-width: 640px; font-size: 1.02rem; line-height: 1.6; margin-bottom: 26px; }
        .dept-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .dept-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start; }
        .dept-grid h2 { font-size: 1.3rem; margin-bottom: 16px; }
        .dept-grid h2.mt { margin-top: 32px; }
        .check-list { display: flex; flex-direction: column; gap: 12px; }
        .check-list li { display: flex; align-items: center; gap: 10px; color: var(--text-soft); font-size: 0.96rem; }
        .dept-side { padding: 28px; position: sticky; top: 100px; }
        .dept-side h3 { font-size: 1rem; margin-bottom: 10px; }
        .dept-side h3.mt-sm { margin-top: 22px; }
        .dept-hours { display: flex; align-items: center; gap: 8px; color: var(--text-soft); }
        .dept-email { display: flex; align-items: center; gap: 8px; color: var(--blue); font-size: 0.92rem; word-break: break-all; }
        .dept-emergency-note {
          display: flex; gap: 10px; align-items: flex-start;
          margin-top: 26px; padding: 16px; border-radius: var(--r-sm);
          background: var(--danger-soft); font-size: 0.86rem; color: var(--text-soft);
        }
        .dept-emergency-note a { color: var(--danger); font-weight: 600; }
        .related-doctors { background: var(--off-white); }
        .related-doctors h2 { margin-bottom: 28px; }
        @media (max-width: 900px) {
          .dept-grid { grid-template-columns: 1fr; }
          .dept-side { position: static; }
        }
      `}</style>
    </PageTransition>
  );
}
