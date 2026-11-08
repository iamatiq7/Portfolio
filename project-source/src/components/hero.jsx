import { Icons, SmartImage } from './ui.jsx';

export default function Hero({ data, resumeUrl }) {
  const { hero, contact, assetPaths, placeholders } = data;
  return (
    <section id="home" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <span className="hero__pulse" aria-hidden="true" />
            {hero.title}
          </p>
          <h1 className="hero__name">{hero.name}</h1>
          <p className="hero__tagline">{hero.tagline}</p>
          <p className="hero__summary">{hero.summary}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              View My Projects
              <Icons.arrowRight size={16} />
            </a>
            <a className="btn btn--ghost" href={resumeUrl} download="Kazi_Atiqur_Rahman_Resume.pdf">
              <Icons.download size={16} />
              Download Resume
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Icons.mail size={16} />
              Contact Me
            </a>
          </div>

          <ul className="hero__meta">
            <li>
              <Icons.briefcase size={15} />
              {hero.workplace}
            </li>
            <li>
              <Icons.mapPin size={15} />
              {contact.location}
            </li>
            <li>
              <Icons.graduation size={15} />
              {hero.educationShort}
            </li>
          </ul>

          <div className="hero__social">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Icons.linkedin size={18} />
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Icons.github size={18} />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Send email">
              <Icons.mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero__photo">
          <div className="hero__photo-frame">
            <SmartImage
              src={assetPaths.profile}
              alt="Portrait of Kazi Atiqur Rahman"
              ratio="3 / 4"
              label="Profile photo"
              note={placeholders.profileNote}
              priority
            />
          </div>
          <div className="hero__photo-card">
            <Icons.terminal size={15} />
            <code>root@dc-hpe:~$ uptime</code>
            <span className="hero__card-status"><span className="dot" />systems nominal</span>
          </div>
        </div>
      </div>

      <div className="hero__stats container">
        {hero.stats.map((s) => (
          <div className="hero__stat" key={s.label}>
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
