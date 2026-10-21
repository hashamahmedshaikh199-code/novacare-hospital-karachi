import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import { doctors } from '../data/doctors.js';
import { departments } from '../data/departments.js';

const availabilityOptions = ['All', 'Mon - Sat', 'Mon - Fri', 'Tue - Sun', 'Mon - Sun'];

export default function Doctors() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const [availability, setAvailability] = useState('All');
  const [minExperience, setMinExperience] = useState(0);
  const [sortBy, setSortBy] = useState('experience');

  const filtered = useMemo(() => {
    let list = doctors.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
      const matchesDept = department === 'all' || d.department === department;
      const matchesAvailability = availability === 'All' || d.availability.startsWith(availability);
      const matchesExperience = d.experienceYears >= minExperience;
      return matchesQuery && matchesDept && matchesAvailability && matchesExperience;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [query, department, availability, minExperience, sortBy]);

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Specialists</span>
          <h1>Meet the NovaCare Doctors</h1>
          <p>{doctors.length} fictional/demo specialists across every department, created for this portfolio project.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="doctors-toolbar card">
            <div className="toolbar-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search doctors"
              />
            </div>

            <div className="toolbar-filters">
              <div className="filter-field">
                <label htmlFor="dept-filter">Department</label>
                <select id="dept-filter" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="all">All Departments</option>
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div className="filter-field">
                <label htmlFor="avail-filter">Availability</label>
                <select id="avail-filter" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {availabilityOptions.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="filter-field">
                <label htmlFor="exp-filter">Min. Experience: {minExperience}+ yrs</label>
                <input id="exp-filter" type="range" min={0} max={18} value={minExperience} onChange={(e) => setMinExperience(Number(e.target.value))} />
              </div>
              <div className="filter-field">
                <label htmlFor="sort-filter"><SlidersHorizontal size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Sort By</label>
                <select id="sort-filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          <p className="results-count">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>

          {filtered.length === 0 ? (
            <p className="empty-state">No doctors match your filters. Try broadening your search.</p>
          ) : (
            <div className="grid-4">
              {filtered.map((doc, i) => <DoctorCard doctor={doc} index={i} key={doc.id} />)}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }

        .doctors-toolbar { padding: 24px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 18px; }
        .toolbar-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--off-white); border: 1px solid var(--gray-line);
          border-radius: var(--r-pill); padding: 12px 20px; color: var(--text-faint);
        }
        .toolbar-search input { border: none; outline: none; width: 100%; background: transparent; color: var(--text); }
        .toolbar-filters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .filter-field { display: flex; flex-direction: column; gap: 6px; }
        .filter-field label { font-size: 0.8rem; font-weight: 600; color: var(--navy); }
        .filter-field select {
          padding: 10px 12px; border: 1px solid var(--gray-line); border-radius: var(--r-sm);
          background: var(--off-white); color: var(--text);
        }
        .results-count { color: var(--text-faint); font-size: 0.88rem; margin-bottom: 22px; }
        .empty-state { color: var(--text-soft); padding: 40px 0; }

        @media (max-width: 900px) {
          .toolbar-filters { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .toolbar-filters { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
