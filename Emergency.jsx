import { Link } from 'react-router-dom';
import { Siren, Phone, Truck, MapPin, AlertTriangle } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';

const firstResponse = [
  'Stay calm and call for help immediately.',
  'Keep the person still and comfortable if a spinal injury is suspected.',
  'Apply firm, direct pressure to control visible bleeding.',
  'If trained, begin CPR only if the person is unresponsive and not breathing normally.',
  'Have someone wait outside to direct the ambulance to the exact location.',
];

export default function Emergency() {
  return (
    <PageTransition>
      <section className="emergency-hero">
        <div className="container">
          <span className="emergency-eyebrow"><Siren size={18} /> Emergency & Trauma Care</span>
          <h1>24/7 Emergency & Trauma Care</h1>
          <p>NovaCare's Emergency & Trauma department is staffed around the clock, every day of the year, to respond to urgent and critical conditions.</p>
          <a href="tel:+922100000000" className="btn btn-emergency emergency-cta">
            <Phone size={18} /> Emergency Assistance: +92 21 0000 0000
          </a>
          <p className="demo-note emergency-demo-note">This is a fictional/demo contact number created for this portfolio project.</p>
        </div>
      </section>

      <section className="section">
        <div className="container emergency-grid">
          <div>
            <h2>Emergency Department</h2>
            <p className="e-text">
              Our Emergency & Trauma department provides rapid triage, stabilization and coordinated care for critical conditions, supported by a dedicated resuscitation area and direct access to imaging, laboratory and operating facilities.
            </p>

            <h2 className="mt">Ambulance Information</h2>
            <p className="e-text">
              <Truck size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Equipped ambulances with trained paramedics are available for emergency transport. Call the emergency line above to request one.
            </p>

            <h2 className="mt">First-Response Guidance</h2>
            <ul className="e-list">
              {firstResponse.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>

            <div className="e-disclaimer">
              <AlertTriangle size={18} color="#D64545" />
              <p>For a real medical emergency, contact your local emergency service or proceed to the nearest emergency department. This page is demo content and does not provide medical instructions for an actual crisis.</p>
            </div>
          </div>

          <aside className="e-side card">
            <h3><MapPin size={16} /> Hospital Location</h3>
            <p>NovaCare Hospital Karachi<br />Clifton, Karachi, Sindh, Pakistan</p>
            <p className="demo-note">Fictional/demo location.</p>
            <h3 className="mt-sm"><Phone size={16} /> Emergency Contact</h3>
            <a href="tel:+922100000000" className="e-phone">+92 21 0000 0000</a>
            <Link to="/appointments" className="btn btn-outline-dark" style={{ marginTop: 18, width: '100%' }}>Book a Regular Appointment</Link>
          </aside>
        </div>
      </section>

      <style>{`
        .emergency-hero {
          background: linear-gradient(160deg, #2A0F12 0%, #4A1414 60%, #611A1A 100%);
          padding: 150px 0 70px;
        }
        .emergency-eyebrow { display: flex; align-items: center; gap: 8px; color: #FFB3B3; font-weight: 600; margin-bottom: 14px; }
        .emergency-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin-bottom: 16px; max-width: 700px; }
        .emergency-hero p { color: rgba(255,255,255,0.82); max-width: 560px; font-size: 1.02rem; margin-bottom: 28px; }
        .emergency-cta { font-size: 1rem; }
        .emergency-demo-note { color: rgba(255,255,255,0.5); margin-top: 14px; }

        .emergency-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start; }
        .emergency-grid h2 { font-size: 1.25rem; margin-bottom: 12px; }
        .emergency-grid h2.mt { margin-top: 28px; }
        .e-text { color: var(--text-soft); line-height: 1.7; }
        .e-list { display: flex; flex-direction: column; gap: 10px; }
        .e-list li { color: var(--text-soft); padding-left: 18px; position: relative; }
        .e-list li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: var(--danger); }
        .e-disclaimer {
          display: flex; gap: 12px; align-items: flex-start;
          margin-top: 28px; padding: 18px; border-radius: var(--r-sm);
          background: var(--danger-soft);
        }
        .e-disclaimer p { font-size: 0.88rem; color: var(--text-soft); line-height: 1.55; }
        .e-side { padding: 26px; position: sticky; top: 100px; }
        .e-side h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; margin-bottom: 8px; }
        .e-side h3.mt-sm { margin-top: 22px; }
        .e-side p { color: var(--text-soft); font-size: 0.92rem; margin-bottom: 4px; }
        .e-phone { color: var(--danger); font-weight: 700; font-size: 1.05rem; }

        @media (max-width: 900px) {
          .emergency-grid { grid-template-columns: 1fr; }
          .e-side { position: static; }
        }
      `}</style>
    </PageTransition>
  );
}
