import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition.jsx';

const infoSections = [
  {
    title: 'Visiting Hours',
    content: 'General visiting hours are 4:00 PM – 8:00 PM daily. ICU visits are limited to two family members at a time, for 15 minutes per visit, to protect patient recovery.',
  },
  {
    title: 'Admission Process',
    content: 'Patients being admitted should bring a valid ID, referral or consultation notes if available, and insurance details if applicable. Our front desk team will guide you through registration and bed assignment.',
  },
  {
    title: 'Discharge Information',
    content: 'Discharge summaries are prepared by the attending physician and include diagnosis, treatment given, and follow-up instructions. Please settle billing at the front desk before collecting discharge paperwork.',
  },
  {
    title: 'Insurance Information',
    content: 'NovaCare works with a range of insurance providers for cashless treatment, subject to policy terms. Please share your insurance card at admission so our billing team can verify coverage.',
  },
  {
    title: 'Payment Information',
    content: 'We accept cash, major debit/credit cards and bank transfers. Itemized bills are available on request for both outpatient and inpatient services.',
  },
];

const faqs = [
  { q: 'Do I need an appointment for a walk-in consultation?', a: 'Walk-ins are accepted in General Medicine, but booking ahead reduces your wait time and guarantees a specific doctor.' },
  { q: 'Can I request a specific doctor for admission?', a: 'Yes, you can request a specific consultant during admission, subject to their availability.' },
  { q: 'Is parking available on-site?', a: 'Yes, on-site parking is available for patients and visitors, with dedicated spaces near the emergency entrance.' },
  { q: 'How do I get my lab results?', a: 'Lab results are shared with your treating doctor and are also available through the laboratory front desk with your patient ID.' },
];

function PatientRightsAndVisitors() {
  return (
    <div className="pr-grid">
      <div>
        <h3>Patient Rights</h3>
        <ul className="check-list">
          <li>Right to receive respectful, non-discriminatory care</li>
          <li>Right to clear information about diagnosis and treatment</li>
          <li>Right to privacy and confidentiality of medical records</li>
          <li>Right to seek a second opinion</li>
        </ul>
      </div>
      <div>
        <h3>Visitor Guidelines</h3>
        <ul className="check-list">
          <li>Please observe posted visiting hours for each ward</li>
          <li>Limit visitors to two per patient at a time</li>
          <li>Children under 12 should be accompanied by an adult</li>
          <li>Follow posted infection-control guidance in each unit</li>
        </ul>
      </div>
    </div>
  );
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="accordion-item" key={item.q}>
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown size={18} className={isOpen ? 'chevron-open' : ''} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="accordion-content"
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function PatientInfo() {
  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Patient Information</span>
          <h1>Everything You Need to Know Before Your Visit</h1>
          <p>Visiting hours, admissions, billing and patient rights, all in one place.</p>
        </div>
      </section>

      <section className="section">
        <div className="container info-grid">
          {infoSections.map((s) => (
            <div className="info-card card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <PatientRightsAndVisitors />
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2>Common Patient Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; max-width: 700px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }

        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .info-card { padding: 28px; }
        .info-card h3 { font-size: 1.05rem; margin-bottom: 10px; }
        .info-card p { color: var(--text-soft); line-height: 1.6; font-size: 0.94rem; }

        .pr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; background: var(--off-white); padding: 36px; border-radius: var(--r-lg); }
        .pr-grid h3 { font-size: 1.05rem; margin-bottom: 14px; }
        .check-list { display: flex; flex-direction: column; gap: 10px; }
        .check-list li { color: var(--text-soft); font-size: 0.92rem; padding-left: 18px; position: relative; }
        .check-list li::before { content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); }

        .faq-section { background: var(--off-white); }
        .accordion { display: flex; flex-direction: column; gap: 12px; max-width: 760px; }
        .accordion-item { background: var(--white); border: 1px solid var(--gray-line); border-radius: var(--r-md); overflow: hidden; }
        .accordion-trigger {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 18px 22px; font-weight: 600; color: var(--navy); text-align: left;
        }
        .chevron-open { transform: rotate(180deg); transition: transform 0.25s; }
        .accordion-content { padding: 0 22px 18px; }
        .accordion-content p { color: var(--text-soft); font-size: 0.92rem; line-height: 1.6; }

        @media (max-width: 900px) {
          .info-grid { grid-template-columns: 1fr; }
          .pr-grid { grid-template-columns: 1fr; padding: 24px; }
        }
      `}</style>
    </PageTransition>
  );
}
