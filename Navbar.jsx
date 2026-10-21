import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Siren } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/departments', label: 'Departments' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/services', label: 'Services' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const solid = scrolled || !isHome || open;

  return (
    <header className={`navbar ${solid ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="NovaCare Hospital Karachi, home">
          <span className="logo-mark">NC</span>
          <span className="logo-text">
            <strong>NOVACARE</strong>
            <small>HOSPITAL KARACHI</small>
          </span>
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/emergency" className="emergency-pill">
            <Siren size={16} strokeWidth={2.4} />
            Emergency
          </Link>
          <Link to="/appointments" className="btn btn-primary btn-sm">Book Appointment</Link>
          <button
            className="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile"
          >
            <div className="container mobile-menu-inner">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className="mobile-link" end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/emergency" className="mobile-link mobile-link-emergency">
                <Siren size={16} /> Emergency
              </NavLink>
              <Link to="/appointments" className="btn btn-primary" style={{ marginTop: 8 }}>
                Book Appointment
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s var(--ease);
          border-bottom: 1px solid transparent;
        }
        .navbar-transparent {
          background: transparent;
        }
        .navbar-solid {
          background: rgba(11, 31, 51, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 30px rgba(11,31,51,0.15);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 78px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--white);
        }
        .logo-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--grad-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--white);
          flex-shrink: 0;
        }
        .logo-text { display: flex; flex-direction: column; line-height: 1.2; }
        .logo-text strong { font-size: 1.05rem; letter-spacing: 0.02em; color: var(--white); }
        .logo-text small { font-size: 0.65rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.65); }
        .navbar-links { display: flex; align-items: center; gap: 30px; }
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.82);
          font-size: 0.92rem;
          font-weight: 500;
          padding: 8px 0;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--white); }
        .nav-link-active { color: var(--white); }
        .nav-link-active::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          border-radius: 2px;
          background: var(--cyan);
        }
        .navbar-actions { display: flex; align-items: center; gap: 14px; }
        .emergency-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #FF9F9F;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: var(--r-pill);
          border: 1px solid rgba(255,120,120,0.4);
          background: rgba(214,69,69,0.12);
        }
        .emergency-pill:hover { background: rgba(214,69,69,0.22); }
        .hamburger { display: none; color: var(--white); padding: 6px; }
        .mobile-menu { overflow: hidden; background: var(--navy); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mobile-menu-inner { display: flex; flex-direction: column; gap: 4px; padding: 16px 24px 28px; }
        .mobile-link { color: rgba(255,255,255,0.88); padding: 12px 4px; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mobile-link-emergency { color: #FF9F9F; display: flex; align-items: center; gap: 8px; }

        @media (max-width: 980px) {
          .navbar-links { display: none; }
          .hamburger { display: block; }
          .navbar-actions .btn-primary { display: none; }
        }
        @media (max-width: 560px) {
          .logo-text small { display: none; }
        }
      `}</style>
    </header>
  );
}
