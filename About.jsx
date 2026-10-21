import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Users2, HeartHandshake, Building2, Clock3 } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const values = [
  { icon: HeartHandshake, title: 'Patient-First Care', desc: 'Every decision starts with what is best for the person in front of us.' },
  { icon: Sparkles, title: 'Modern Technology', desc: 'Continual investment in diagnostic and treatment equipment.' },
  { icon: Users2, title: 'Multidisciplinary Teams', desc: 'Specialists across departments collaborate on complex cases.' },
  { icon: Clock3, title: '24/7 Emergency Services', desc: 'Emergency care is always available, without exception.' },
  { icon: Building2, title: 'Comfortable Environment', desc: 'Facilities designed to feel calm rather than clinical.' },
  { icon: ShieldCheck, title: 'Trusted Standards', desc: 'Consistent protocols across every department and shift.' },
];

export default function About() {
  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About NovaCare</span>
          <h1>Healthcare Built Around You</h1>
          <p>NovaCare Hospital Karachi is a fictional/demo hospital concept created for a portfolio project — not a real medical institution.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-body">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2>Our Mission</h2>
            <p>
              NovaCare exists, in this fictional concept, to bring advanced medical technology and experienced specialists together with a genuinely human approach to care. The idea behind NovaCare is a hospital where patients are never just a case number — where every department, from cardiology to rehabilitation, works from the same patient-first standard.
            </p>
            <p>
              This site imagines what that would look like in practice: clear communication, coordinated specialists, modern facilities and round-the-clock emergency readiness, all organized around the patient's experience rather than internal processes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <SectionTitle eyebrow="What We Stand For" title="Our Core Values" center />
          <div className="grid-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="value-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <div className="value-icon"><v.icon size={22} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; max-width: 640px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; line-height: 1.6; }
        .about-body { max-width: 760px; }
        .about-body h2 { margin-bottom: 16px; }
        .about-body p { color: var(--text-soft); line-height: 1.7; margin-bottom: 16px; font-size: 1.02rem; }
        .values-section { background: var(--off-white); }
        .value-card { padding: 28px; display: flex; flex-direction: column; gap: 8px; }
        .value-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: var(--grad-card); color: var(--blue);
          display: flex; align-items: center; justify-content: center; margin-bottom: 6px;
        }
        .value-card h3 { font-size: 1.02rem; }
        .value-card p { color: var(--text-soft); font-size: 0.9rem; line-height: 1.55; }
      `}</style>
    </PageTransition>
  );
}
