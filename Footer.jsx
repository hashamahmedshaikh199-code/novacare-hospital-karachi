import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark">NC</span>
            <span>
              <strong>NOVACARE</strong>
              <small>HOSPITAL KARACHI</small>
            </span>
          </div>
          <p className="footer-tagline">Advanced Care. Trusted Hands.</p>
          <div className="footer-socials" aria-label="Social media links">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Medical Departments</h4>
          <ul>
            <li><Link to="/departments/cardiology">Cardiology</Link></li>
            <li><Link to="/departments/neurology">Neurology</Link></li>
            <li><Link to="/departments/orthopedics">Orthopedics</Link></li>
            <li><Link to="/departments/pediatrics">Pediatrics</Link></li>
            <li><Link to="/departments/gynecology">Gynecology</Link></li>
            <li><Link to="/departments/general-medicine">General Medicine</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><MapPin size={16} /><span>Clifton, Karachi, Pakistan</span></li>
            <li><Phone size={16} /><span>+92 21 0000 0000</span></li>
            <li><Mail size={16} /><a href="mailto:info@novacare-demo.pk">info@novacare-demo.pk</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaCare Hospital Karachi. All rights reserved.</p>
        <p className="footer-disclaimer">
          NovaCare Hospital Karachi is a fictional/demo project. Doctors, reviews, statistics, contact details and hospital information shown on this website are sample content and do not represent a real medical institution.
        </p>
      </div>

      <style>{`
        .site-footer { background: var(--navy); color: rgba(255,255,255,0.78); padding-top: 72px; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .footer-logo strong { display: block; color: var(--white); font-size: 1rem; letter-spacing: 0.02em; }
        .footer-logo small { display: block; font-size: 0.62rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.55); }
        .footer-tagline { font-family: var(--font-display); font-size: 1.05rem; color: var(--cyan); margin-bottom: 20px; }
        .footer-socials { display: flex; gap: 12px; }
        .footer-socials a {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08); color: var(--white);
          transition: background 0.25s;
        }
        .footer-socials a:hover { background: var(--blue); }
        .footer-col h4 { color: var(--white); font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; margin-bottom: 18px; }
        .footer-col ul { display: flex; flex-direction: column; gap: 11px; }
        .footer-col a, .footer-col span { font-size: 0.9rem; color: rgba(255,255,255,0.68); transition: color 0.2s; }
        .footer-col a:hover { color: var(--cyan); }
        .footer-contact li { display: flex; align-items: center; gap: 10px; }
        .footer-bottom {
          display: flex; flex-direction: column; gap: 10px;
          padding: 28px 24px 36px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
        }
        .footer-disclaimer { max-width: 760px; line-height: 1.6; }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
