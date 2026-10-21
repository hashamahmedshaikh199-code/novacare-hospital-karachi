import { motion } from 'framer-motion';

export default function ServiceCard({ service, index = 0, onSelect }) {
  const Icon = service.icon;
  return (
    <motion.button
      className="service-card card"
      onClick={() => onSelect?.(service)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
    >
      <div className="service-icon"><Icon size={24} strokeWidth={1.8} /></div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <span className="service-more">Learn More</span>

      <style>{`
        .service-card {
          padding: 28px; text-align: left; display: flex; flex-direction: column; gap: 8px;
          width: 100%; height: 100%;
        }
        .service-icon {
          width: 50px; height: 50px; border-radius: 50%;
          background: var(--grad-accent); color: var(--white);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .service-card h3 { font-size: 1.05rem; }
        .service-card p { color: var(--text-soft); font-size: 0.9rem; line-height: 1.55; flex-grow: 1; }
        .service-more { color: var(--blue); font-weight: 600; font-size: 0.85rem; margin-top: 6px; }
      `}</style>
    </motion.button>
  );
}
