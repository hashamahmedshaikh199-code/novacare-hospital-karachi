import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, Mail, CalendarCheck, GraduationCap, BriefcaseMedical, Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import { getDoctorById } from '../data/doctors.js';
import { getDepartmentById } from '../data/departments.js';
import { testimonials } from '../data/testimonials.js';

function initials(name) {
  return name.replace('Dr. ', '').split(' ').map((n) => n[0]).slice(0, 2).join('');
}

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor = getDoctorById(id);
  if (!doctor) return <Navigate to="/404" replace />;

  const department = getDepartmentById(doctor.department);
  const sampleReviews = testimonials.slice(0, 2);

  return (
    <PageTransition>
      <section className="page-hero doc-hero">
        <div className="container doc-hero-inner">
          <div className="doc-hero-portrait">{initials(doctor.name)}</div>
          <div>
            <span className="eyebrow">{doctor.specialty}</span>
            <h1>{doctor.name}</h1>
            <p className="doc-hero-demo">Fictional Demo Profile</p>
            <div className="doc-hero-meta">
              <span><GraduationCap size={16} /> {doctor.qualification}</span>
              <span><BriefcaseMedical size={16} /> {doctor.experience} Experience</span>
              <span><Star size={16} fill="#F5B942" color="#F5B942" /> {doctor.rating.toFixed(1)} Rating</span>
            </div>
            <div className="doc-hero-actions">
              <Link to={`/appointments?doctor=${doctor.id}`} className="btn btn-primary"><CalendarCheck size={16} /> Book Appointment</Link>
              <a href={`mailto:${doctor.email}`} className="btn btn-outline"><Mail size={16} /> Email Doctor</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container doc-grid">
          <div>
            <h2>About</h2>
            <p className="doc-about">
              {doctor.name} is a {doctor.specialty.toLowerCase()} in the {department?.name} department at NovaCare Hospital Karachi, with {doctor.experience.toLowerCase()} of experience. This profile is fictional/demo content created for this portfolio project.
            </p>

            <h2 className="mt">Education</h2>
            <p className="doc-about">{doctor.qualification}</p>

            <h2 className="mt">Specializations</h2>
            <ul className="check-list">
              {department?.conditions.slice(0, 4).map((c) => <li key={c}>{c}</li>)}
            </ul>

            <h2 className="mt">Patient Reviews</h2>
            <div className="review-list">
              {sampleReviews.map((r) => (
                <div className="review-item card" key={r.name}>
                  <div className="review-stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={13} fill={idx < r.rating ? '#F5B942' : 'none'} color="#F5B942" />
                    ))}
                  </div>
                  <p>&ldquo;{r.quote}&rdquo;</p>
                  <strong>{r.name}</strong>
                </div>
              ))}
            </div>
            <p className="demo-note" style={{ marginTop: 10 }}>Reviews shown are fictional/demo testimonials, not specific to this doctor.</p>
          </div>

          <aside className="doc-side card">
            <h3><Clock size={16} /> Consultation Schedule</h3>
            <p>{doctor.availability}</p>
            <h3 className="mt-sm">Department</h3>
            <Link to={`/departments/${doctor.department}`} className="dept-email">{department?.name}</Link>
            <h3 className="mt-sm">Email</h3>
            <a href={`mailto:${doctor.email}`} className="dept-email"><Mail size={15} /> {doctor.email}</a>
          </aside>
        </div>
      </section>

      <style>{`
        .doc-hero { padding: 150px 0 60px; }
        .doc-hero-inner { display: flex; gap: 32px; align-items: flex-start; }
        .doc-hero-portrait {
          width: 96px; height: 96px; border-radius: 24px; flex-shrink: 0;
          background: var(--grad-accent); color: var(--white);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 700; font-size: 2rem;
        }
        .doc-hero .eyebrow { color: var(--cyan); }
        .doc-hero h1 { color: var(--white); font-size: clamp(1.8rem, 3.4vw, 2.5rem); margin: 6px 0 4px; }
        .doc-hero-demo { color: rgba(255,255,255,0.55); font-size: 0.85rem; margin-bottom: 16px; font-style: italic; }
        .doc-hero-meta { display: flex; gap: 22px; flex-wrap: wrap; margin-bottom: 24px; }
        .doc-hero-meta span { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.82); font-size: 0.9rem; }
        .doc-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .doc-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start; }
        .doc-grid h2 { font-size: 1.25rem; margin-bottom: 12px; }
        .doc-grid h2.mt { margin-top: 30px; }
        .doc-about { color: var(--text-soft); line-height: 1.7; }
        .check-list { display: flex; flex-direction: column; gap: 10px; }
        .check-list li { color: var(--text-soft); padding-left: 18px; position: relative; }
        .check-list li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); }
        .review-list { display: flex; flex-direction: column; gap: 14px; }
        .review-item { padding: 20px; }
        .review-stars { display: flex; gap: 3px; margin-bottom: 8px; }
        .review-item p { color: var(--text-soft); font-size: 0.92rem; margin-bottom: 8px; }
        .review-item strong { font-size: 0.85rem; color: var(--navy); }
        .doc-side { padding: 26px; position: sticky; top: 100px; }
        .doc-side h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; margin-bottom: 8px; }
        .doc-side h3.mt-sm { margin-top: 20px; }
        .doc-side p { color: var(--text-soft); font-size: 0.92rem; }
        .dept-email { color: var(--blue); font-size: 0.92rem; display: flex; align-items: center; gap: 8px; word-break: break-all; }

        @media (max-width: 900px) {
          .doc-grid { grid-template-columns: 1fr; }
          .doc-side { position: static; }
        }
        @media (max-width: 600px) {
          .doc-hero-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </PageTransition>
  );
}
