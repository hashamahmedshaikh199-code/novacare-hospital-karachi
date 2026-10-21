import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services } from '../data/services.js';

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Services</span>
          <h1>Everything a Modern Hospital Should Offer</h1>
          <p>From emergency response to home healthcare, NovaCare's services are designed to work together.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {services.map((s, i) => (
              <ServiceCard service={s} index={i} key={s.id} onSelect={setActive} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="service-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="service-modal card"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
            >
              <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
                <X size={20} />
              </button>
              <div className="modal-icon"><active.icon size={26} /></div>
              <h2>{active.name}</h2>
              <p>{active.description}</p>
              <p className="demo-note">This is demo content describing a fictional hospital service.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; max-width: 700px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }

        .service-modal-backdrop {
          position: fixed; inset: 0; background: rgba(11,31,51,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 200; padding: 20px;
        }
        .service-modal { max-width: 440px; padding: 36px; position: relative; }
        .modal-close { position: absolute; top: 18px; right: 18px; color: var(--text-faint); }
        .modal-close:hover { color: var(--navy); }
        .modal-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--grad-accent); color: var(--white);
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .service-modal h2 { font-size: 1.3rem; margin-bottom: 12px; }
        .service-modal p { color: var(--text-soft); line-height: 1.6; margin-bottom: 10px; }
      `}</style>
    </PageTransition>
  );
}
