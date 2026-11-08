import { useEffect, useState } from 'react';
import { Icons } from './ui.jsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ active, resumeUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar__inner container">
          <a href="#home" onClick={go('home')} className="navbar__brand" aria-label="Kazi Atiqur Rahman — home">
            <span className="navbar__monogram">KA</span>
            <span className="navbar__name">Kazi Atiqur Rahman</span>
          </a>

          <nav className="navbar__nav" aria-label="Primary">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className={`navbar__link ${active === item.id ? 'is-active' : ''}`}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <a
              className="btn btn--primary navbar__resume"
              href={resumeUrl}
              download="Kazi_Atiqur_Rahman_Resume.pdf"
            >
              <Icons.download size={16} />
              <span className="navbar__resume-full">Resume</span>
              <span className="navbar__resume-short">CV</span>
            </a>
            <button
              type="button"
              className="navbar__burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <Icons.close size={22} /> : <Icons.menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={go(item.id)} className="mobile-menu__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary" href={resumeUrl} download="Kazi_Atiqur_Rahman_Resume.pdf">
            <Icons.download size={16} />
            Download Resume
          </a>
        </nav>
      </div>
      {open && <div className="mobile-menu__scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
