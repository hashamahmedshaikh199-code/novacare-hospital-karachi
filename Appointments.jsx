import { useSearchParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import AppointmentForm from '../components/AppointmentForm.jsx';

export default function Appointments() {
  const [params] = useSearchParams();
  const doctorId = params.get('doctor');

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Book a Consultation</span>
          <h1>Schedule Your Appointment</h1>
          <p>Fill in your details and preferred timing — our team will follow up to confirm.</p>
        </div>
      </section>

      <section className="section">
        <div className="container appt-container">
          <AppointmentForm initialDoctorId={doctorId} />
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 70px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }
        .appt-container { max-width: 720px; }
      `}</style>
    </PageTransition>
  );
}
