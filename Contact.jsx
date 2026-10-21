import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';

const contactCards = [
  { title: 'General Information', email: 'info@novacare-demo.pk', phone: '+92 21 0000 0000' },
  { title: 'Appointments', email: 'appointment@novacare-demo.pk', phone: '+92 21 0000 0000' },
  { title: 'Emergency', email: 'emergency@novacare-demo.pk', phone: '+92 21 0000 0000' },
  { title: 'Departments', email: 'info@novacare-demo.pk', phone: '+92 21 0000 0000' },
];

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm(emptyForm);
  }

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get in Touch</span>
          <h1>Contact NovaCare</h1>
          <p>Reach out for general questions, appointments or department-specific inquiries.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container grid-4">
          {contactCards.map((c) => (
            <div className="contact-card card" key={c.title}>
              <h3>{c.title}</h3>
              <a href={`mailto:${c.email}`}><Mail size={14} /> {c.email}</a>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`}><Phone size={14} /> {c.phone}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Send a Message</h2>
            {sent ? (
              <div className="contact-success card">
                <CheckCircle2 size={40} color="#1E9E6C" />
                <p>Your message has been submitted successfully.</p>
                <p className="demo-note">This is frontend demo functionality — no message was actually sent.</p>
                <button className="btn btn-outline-dark" onClick={() => setSent(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="appt-form card" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="c-name">Name</label>
                    <input id="c-name" value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="c-phone">Phone (optional)</label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-subject">Subject</label>
                    <input id="c-subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} aria-invalid={!!errors.subject} />
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary appt-submit"><Send size={16} /> Send Message</button>
              </form>
            )}
          </div>

          <aside className="location-card card">
            <h3><MapPin size={17} /> Hospital Location</h3>
            <p>NovaCare Hospital Karachi<br />Clifton, Karachi, Sindh, Pakistan</p>
            <p className="demo-note">Fictional/demo location.</p>
            <div className="map-placeholder" aria-hidden="true">
              <MapPin size={30} />
              <span>Map view placeholder</span>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .page-hero { background: var(--grad-hero); padding: 150px 0 60px; }
        .page-hero .eyebrow { color: var(--cyan); }
        .page-hero h1 { color: var(--white); font-size: clamp(2rem, 4vw, 2.9rem); margin: 12px 0 16px; }
        .page-hero p { color: rgba(255,255,255,0.78); max-width: 560px; font-size: 1.02rem; }

        .contact-card { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
        .contact-card h3 { font-size: 0.98rem; margin-bottom: 4px; }
        .contact-card a { display: flex; align-items: center; gap: 8px; color: var(--text-soft); font-size: 0.88rem; }
        .contact-card a:hover { color: var(--blue); }

        .contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: start; }
        .contact-grid h2 { margin-bottom: 20px; }
        .appt-form { padding: 30px; display: flex; flex-direction: column; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 0.85rem; font-weight: 600; color: var(--navy); }
        .form-field input, .form-field textarea {
          padding: 12px 14px; border: 1px solid var(--gray-line); border-radius: var(--r-sm);
          background: var(--off-white); color: var(--text);
        }
        .form-field input[aria-invalid="true"], .form-field textarea[aria-invalid="true"] { border-color: var(--danger); }
        .field-error { color: var(--danger); font-size: 0.78rem; }
        .appt-submit { width: 100%; }
        .contact-success { padding: 44px 28px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .contact-success p { color: var(--text-soft); }
        .contact-success .btn { margin-top: 10px; }

        .location-card { padding: 28px; }
        .location-card h3 { display: flex; align-items: center; gap: 8px; font-size: 1rem; margin-bottom: 10px; }
        .location-card p { color: var(--text-soft); font-size: 0.92rem; margin-bottom: 4px; }
        .map-placeholder {
          margin-top: 20px; height: 180px; border-radius: var(--r-md);
          background: var(--grad-card); border: 1px dashed rgba(20,121,209,0.3);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
          color: var(--blue-dim); font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
