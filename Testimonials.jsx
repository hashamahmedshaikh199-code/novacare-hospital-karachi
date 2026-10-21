import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials.js';

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Patient Stories</span>
          <h2>What Patients Say</h2>
          <p>Sample feedback created to demonstrate this portfolio project.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <motion.div
              className="testimonial-card card"
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill={idx < t.rating ? '#F5B942' : 'none'} color="#F5B942" />
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.department}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="demo-note" style={{ textAlign: 'center', marginTop: 24 }}>
          Testimonials are fictional/demo content created for this portfolio project.
        </p>
      </div>

      <style>{`
        .testimonials-section { background: var(--off-white); padding: var(--section-pad) 0; }
        .testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .testimonial-card { padding: 26px; display: flex; flex-direction: column; gap: 14px; }
        .testimonial-stars { display: flex; gap: 3px; }
        .testimonial-quote { color: var(--text-soft); line-height: 1.6; font-size: 0.95rem; flex-grow: 1; }
        .testimonial-author { display: flex; flex-direction: column; }
        .testimonial-author strong { font-size: 0.92rem; color: var(--navy); }
        .testimonial-author span { font-size: 0.8rem; color: var(--text-faint); }
        @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
