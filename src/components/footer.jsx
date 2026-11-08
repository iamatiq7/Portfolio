import { Icons } from './ui.jsx';

export default function Footer({ data }) {
  const { contact, site } = data;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__monogram">KA</span>
          <div>
            <p className="footer__name">Kazi Atiqur Rahman</p>
            <p className="footer__title">{site.footerTitle}</p>
          </div>
        </div>

        <ul className="footer__links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#expertise">Expertise</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer__social">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icons.linkedin size={17} />
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icons.github size={17} />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email">
            <Icons.mail size={17} />
          </a>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {year} Kazi Atiqur Rahman · Dhaka, Bangladesh</p>
        <p className="footer__build">Designed &amp; built with an engineering mindset.</p>
      </div>
    </footer>
  );
}
