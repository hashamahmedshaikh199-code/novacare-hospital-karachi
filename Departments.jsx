import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import DepartmentCard from '../components/DepartmentCard.jsx';
import { departments } from '../data/departments.js';

export default function Departments() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return departments;
    return departments.filter((d) => d.name.toLowerCase().includes(q) || d.short.toLowerCase().includes(q));
  }, [query]);

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Medical Departments</span>
          <h1>20 Departments, One Coordinated Hospital</h1>
          <p>Explore NovaCare's specialties, from cardiology to emergency and trauma care.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dept-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search departments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search departments"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="empty-state">No departments match "{query}". Try a different search term.</p>
          ) : (
            <div className="grid-4">
              {filtered.map((d, i) => <DepartmentCard department={d} index={i} key={d.id} />)}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; max-width: 700px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }
        .dept-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--white); border: 1px solid var(--gray-line);
          border-radius: var(--r-pill); padding: 12px 20px; max-width: 420px;
          margin-bottom: 36px; color: var(--text-faint);
        }
        .dept-search input { border: none; outline: none; width: 100%; background: transparent; color: var(--text); }
        .empty-state { color: var(--text-soft); padding: 40px 0; }
      `}</style>
    </PageTransition>
  );
}
