import { Link } from 'react-router-dom';
import { Home, Stethoscope } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="notfound-section">
        <div className="container notfound-inner">
          <span className="notfound-code">404</span>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or may have moved.</p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary"><Home size={16} /> Back to Home</Link>
            <Link to="/doctors" className="btn btn-outline-dark"><Stethoscope size={16} /> Find a Doctor</Link>
          </div>
        </div>
      </section>

      <style>{`
        .notfound-section { padding: 180px 0 120px; }
        .notfound-inner { text-align: center; max-width: 480px; margin: 0 auto; }
        .notfound-code {
          font-family: var(--font-display); font-size: 5rem; font-weight: 700;
          background: var(--grad-accent); -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .notfound-section h1 { margin: 8px 0 12px; }
        .notfound-section p { color: var(--text-soft); margin-bottom: 32px; }
        .notfound-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </PageTransition>
  );
}
