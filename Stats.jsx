import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 20, suffix: '+', label: 'Medical Departments' },
  { value: 40, suffix: '+', label: 'Specialists' },
  { value: 24, suffix: '/7', label: 'Emergency Care', isRatio: true },
  { value: 50, suffix: 'K+', label: 'Patients Served' },
];

function Counter({ value, suffix, isRatio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isRatio) return;
    let frame;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, isRatio]);

  return (
    <span ref={ref} className="stat-value">
      {isRatio ? value : count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <Counter value={s.value} suffix={s.suffix} isRatio={s.isRatio} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="demo-note stats-note">Figures shown are illustrative, fictional statistics created for this demo project.</p>
      </div>

      <style>{`
        .stats-section { background: var(--navy); padding: 64px 0; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        .stat-item { display: flex; flex-direction: column; gap: 6px; }
        .stat-value {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 600;
          background: var(--grad-accent);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-label { color: rgba(255,255,255,0.72); font-size: 0.92rem; }
        .stats-note { text-align: center; margin-top: 36px; color: rgba(255,255,255,0.4); }
        @media (max-width: 720px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 20px; }
        }
      `}</style>
    </section>
  );
}
