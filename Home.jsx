import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Siren, Stethoscope, LayoutGrid, ArrowRight,
  ShieldCheck, Users2, Sparkles, HeartHandshake, Building2, Clock3
} from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Hero3D from '../components/Hero3D.jsx';
import Stats from '../components/Stats.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import DepartmentCard from '../components/DepartmentCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { departments } from '../data/departments.js';

const quickActions = [
  { icon: Siren, title: 'Emergency Care', desc: '24/7 emergency assistance', to: '/emergency', accent: true },
  { icon: CalendarCheck, title: 'Book Appointment', desc: 'Schedule your consultation', to: '/appointments' },
  { icon: Stethoscope, title: 'Find a Doctor', desc: 'Explore our specialists', to: '/doctors' },
  { icon: LayoutGrid, title: 'Our Departments', desc: 'Explore medical specialties', to: '/departments' },
];

const whyChoose = [
  { icon: Sparkles, title: 'Advanced Technology', desc: 'Modern diagnostic and treatment equipment across every department.' },
  { icon: Users2, title: 'Experienced Specialists', desc: 'A multidisciplinary team of qualified, fictional demo consultants.' },
  { icon: HeartHandshake, title: 'Patient-Centered Care', desc: 'Care plans built around each patient, not a one-size-fits-all process.' },
  { icon: Clock3, title: '24/7 Emergency Support', desc: 'Round-the-clock emergency response, every day of the year.' },
  { icon: Building2, title: 'Modern Facilities', desc: 'Comfortable, well-equipped spaces designed with patients in mind.' },
  { icon: ShieldCheck, title: 'Multidisciplinary Treatment', desc: 'Departments coordinate closely for complex, connected cases.' },
];

export default function Home() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-eyebrow">NovaCare Hospital Karachi</span>
            <h1>Advanced Healthcare, Closer to You.</h1>
            <p>NovaCare Hospital Karachi combines advanced medical technology, experienced specialists and compassionate care to provide patients with trusted healthcare under one roof.</p>
            <div className="hero-actions">
              <Link to="/appointments" className="btn btn-primary">Book an Appointment</Link>
              <Link to="/doctors" className="btn btn-outline">Find a Doctor</Link>
            </div>
            <Link to="/emergency" className="hero-emergency">
              <Siren size={18} /> 24/7 Emergency Care <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions">
        <div className="container quick-grid">
          {quickActions.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link to={q.to} className={`quick-card card ${q.accent ? 'quick-card-accent' : ''}`}>
                <div className="quick-icon"><q.icon size={22} /></div>
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Stats />

      {/* ABOUT PREVIEW */}
      <section className="section about-preview">
        <div className="container about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-visual-block">
              <ShieldCheck size={40} color="#1479D1" />
              <span>Trusted, patient-first care model</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="eyebrow">About NovaCare</span>
            <h2>Healthcare Built Around You</h2>
            <p className="about-lead">
              NovaCare Hospital Karachi was envisioned as a place where advanced medicine and genuine human care meet — a hospital designed around the patient, not just the procedure.
            </p>
            <ul className="about-list">
              <li>Patient-first care in every department</li>
              <li>Modern medical technology across diagnostics and treatment</li>
              <li>Multidisciplinary specialists working as one team</li>
              <li>24/7 emergency services when it matters most</li>
              <li>A comfortable, calming environment for patients and families</li>
            </ul>
            <Link to="/about" className="btn btn-outline-dark">Learn More About NovaCare</Link>
          </motion.div>
        </div>
      </section>

      {/* DEPARTMENTS PREVIEW */}
      <section className="section departments-preview">
        <div className="container">
          <SectionTitle
            eyebrow="Medical Departments"
            title="Specialized Care, Under One Roof"
            description="From cardiology to rehabilitation, NovaCare brings together 20 departments working in close coordination."
          />
          <div className="grid-4">
            {departments.slice(0, 8).map((d, i) => <DepartmentCard department={d} index={i} key={d.id} />)}
          </div>
          <div className="see-all-wrap">
            <Link to="/departments" className="btn btn-outline-dark">View All Departments</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section why-choose">
        <div className="container">
          <SectionTitle
            eyebrow="Why NovaCare"
            title="Why Choose NovaCare"
            center
          />
          <div className="grid-3 why-grid">
            {whyChoose.map((w, i) => (
              <motion.div
                key={w.title}
                className="why-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <div className="why-icon"><w.icon size={22} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <style>{`
        .hero {
          background: var(--grad-hero);
          padding: 150px 0 90px;
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 40px;
        }
        .hero-eyebrow { color: var(--cyan); font-weight: 600; font-size: 0.92rem; letter-spacing: 0.01em; }
        .hero-copy h1 {
          color: var(--white);
          font-size: clamp(2.3rem, 4.6vw, 3.6rem);
          margin: 14px 0 20px;
          max-width: 620px;
        }
        .hero-copy p { color: rgba(255,255,255,0.78); font-size: 1.08rem; line-height: 1.65; max-width: 520px; margin-bottom: 32px; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 26px; }
        .hero-emergency {
          display: inline-flex; align-items: center; gap: 8px;
          color: #FFB3B3; font-weight: 600; font-size: 0.92rem;
        }
        .hero-emergency:hover { color: #FFD1D1; }
        .hero-visual { min-height: 380px; }

        .quick-actions { background: var(--off-white); padding: 0; margin-top: -56px; position: relative; z-index: 2; }
        .quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .quick-card { display: block; padding: 26px; }
        .quick-card-accent { background: var(--navy); border-color: var(--navy); }
        .quick-card-accent h3, .quick-card-accent p { color: rgba(255,255,255,0.92); }
        .quick-card-accent .quick-icon { background: rgba(255,255,255,0.12); color: #FF9F9F; }
        .quick-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: var(--grad-card); color: var(--blue);
          display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .quick-card h3 { font-size: 1rem; margin-bottom: 4px; }
        .quick-card p { color: var(--text-soft); font-size: 0.86rem; }

        .about-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center; }
        .about-visual-block {
          background: var(--grad-card);
          border: 1px solid rgba(20,121,209,0.15);
          border-radius: var(--r-lg);
          padding: 60px 32px;
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;
          color: var(--navy);
          font-weight: 600;
        }
        .about-lead { color: var(--text-soft); font-size: 1.05rem; line-height: 1.65; margin: 14px 0 22px; }
        .about-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .about-list li {
          padding-left: 22px;
          position: relative;
          color: var(--text-soft);
          font-size: 0.95rem;
        }
        .about-list li::before {
          content: '';
          position: absolute; left: 0; top: 9px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--cyan);
        }

        .see-all-wrap { display: flex; justify-content: center; margin-top: 36px; }

        .why-grid { margin-top: 8px; }
        .why-item { padding: 8px; }
        .why-icon {
          width: 48px; height: 48px; border-radius: 50%;
          background: var(--navy); color: var(--cyan);
          display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
        }
        .why-item h3 { font-size: 1.02rem; margin-bottom: 6px; }
        .why-item p { color: var(--text-soft); font-size: 0.9rem; line-height: 1.55; }

        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-visual { order: -1; min-height: 300px; }
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 720px) {
          .quick-grid { grid-template-columns: 1fr 1fr; }
          .hero { padding-top: 120px; }
        }
        @media (max-width: 480px) {
          .quick-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
