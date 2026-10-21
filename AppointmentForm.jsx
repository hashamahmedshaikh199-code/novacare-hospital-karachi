import { useMemo, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { departments } from '../data/departments.js';
import { getDoctorsByDepartment, getDoctorById } from '../data/doctors.js';

const emptyForm = {
  fullName: '',
  phone: '',
  email: '',
  department: '',
  doctor: '',
  date: '',
  time: '',
  reason: '',
};

function todayStr() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export default function AppointmentForm({ initialDoctorId }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialDoctorId) {
      const doc = getDoctorById(initialDoctorId);
      if (doc) {
        setForm((f) => ({ ...f, department: doc.department, doctor: doc.id }));
      }
    }
  }, [initialDoctorId]);

  const availableDoctors = useMemo(
    () => (form.department ? getDoctorsByDepartment(form.department) : []),
    [form.department]
  );

  function update(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === 'department') next.doctor = '';
      return next;
    });
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!/^[0-9+()\-\s]{7,20}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email address.';
    if (!form.department) errs.department = 'Please select a department.';
    if (!form.doctor) errs.doctor = 'Please select a doctor.';
    if (!form.date) errs.date = 'Please select a preferred date.';
    else if (form.date < todayStr()) errs.date = 'Date cannot be in the past.';
    if (!form.time) errs.time = 'Please select a preferred time.';
    if (!form.reason.trim()) errs.reason = 'Please tell us the reason for your visit.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(emptyForm);
  }

  if (submitted) {
    return (
      <div className="appt-success card">
        <CheckCircle2 size={44} color="#1E9E6C" />
        <h3>Appointment Request Received</h3>
        <p>Thank you. Your appointment request has been submitted successfully. Our team will contact you to confirm the schedule.</p>
        <p className="demo-note">This is a frontend demo — no appointment has actually been booked with a real hospital.</p>
        <button className="btn btn-outline-dark" onClick={() => setSubmitted(false)}>Book Another Appointment</button>
        <style>{`
          .appt-success { padding: 48px 32px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
          .appt-success h3 { margin-top: 6px; }
          .appt-success p { color: var(--text-soft); max-width: 440px; }
          .appt-success .btn { margin-top: 14px; }
        `}</style>
      </div>
    );
  }

  return (
    <form className="appt-form card" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} aria-invalid={!!errors.fullName} />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="department">Department</label>
          <select id="department" value={form.department} onChange={(e) => update('department', e.target.value)} aria-invalid={!!errors.department}>
            <option value="">Select department</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          {errors.department && <span className="field-error">{errors.department}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="doctor">Doctor</label>
          <select id="doctor" value={form.doctor} onChange={(e) => update('doctor', e.target.value)} disabled={!form.department} aria-invalid={!!errors.doctor}>
            <option value="">{form.department ? 'Select doctor' : 'Select a department first'}</option>
            {availableDoctors.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
          </select>
          {errors.doctor && <span className="field-error">{errors.doctor}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="date">Preferred Date</label>
          <input id="date" type="date" min={todayStr()} value={form.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date} />
          {errors.date && <span className="field-error">{errors.date}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="time">Preferred Time</label>
          <input id="time" type="time" value={form.time} onChange={(e) => update('time', e.target.value)} aria-invalid={!!errors.time} />
          {errors.time && <span className="field-error">{errors.time}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="reason">Reason for Visit</label>
        <textarea id="reason" rows={4} value={form.reason} onChange={(e) => update('reason', e.target.value)} aria-invalid={!!errors.reason} />
        {errors.reason && <span className="field-error">{errors.reason}</span>}
      </div>

      <button type="submit" className="btn btn-primary appt-submit">Request Appointment</button>
      <p className="demo-note">This form is a frontend demo. Submitting it does not book a real appointment.</p>

      <style>{`
        .appt-form { padding: 32px; display: flex; flex-direction: column; gap: 18px; width: 100%; min-width: 0; box-sizing: border-box; }
        .form-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; width: 100%; min-width: 0; }
        .form-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; width: 100%; }
        .form-field label { font-size: 0.85rem; font-weight: 600; color: var(--navy); }
        .form-field input, .form-field select, .form-field textarea {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 12px 14px;
          border: 1px solid var(--gray-line);
          border-radius: var(--r-sm);
          background: var(--off-white);
          color: var(--text);
        }
        .form-field textarea { resize: vertical; }
        .form-field select { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .form-field input[aria-invalid="true"], .form-field select[aria-invalid="true"], .form-field textarea[aria-invalid="true"] {
          border-color: var(--danger);
        }
        .field-error { color: var(--danger); font-size: 0.78rem; }
        .appt-submit { width: 100%; margin-top: 6px; }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .appt-form { padding: 22px; }
        }
      `}</style>
    </form>
  );
}
