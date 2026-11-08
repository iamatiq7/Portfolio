import { Icons } from './ui.jsx';

export default function About({ data }) {
  const { about } = data;
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">About Me</p>
          <h2>An engineer behind the racks</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'about-text__lead' : ''}>
                {p}
              </p>
            ))}
            <ul className="about-highlights">
              {about.highlights.map((h) => (
                <li key={h.title}>
                  <span className="about-highlights__icon">
                    {h.icon === 'server' && <Icons.server size={15} />}
                    {h.icon === 'database' && <Icons.database size={15} />}
                    {h.icon === 'layers' && <Icons.layers size={15} />}
                    {h.icon === 'shield' && <Icons.shield size={15} />}
                    {h.icon === 'wrench' && <Icons.wrench size={15} />}
                    {h.icon === 'network' && <Icons.network size={15} />}
                  </span>
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="about-aside reveal">
            <div className="about-aside__card card">
              <h3>Quick facts</h3>
              <dl>
                <div><dt>Role</dt><dd>{data.about.quickFacts.role}</dd></div>
                <div><dt>Company</dt><dd>{data.about.quickFacts.company}</dd></div>
                <div><dt>Department</dt><dd>{data.about.quickFacts.dept}</dd></div>
                <div><dt>Domain</dt><dd>{data.about.quickFacts.domain}</dd></div>
                <div><dt>Location</dt><dd>{data.contact.location}</dd></div>
                <div><dt>Education</dt><dd>{data.about.quickFacts.education}</dd></div>
                <div><dt>Languages</dt><dd>{data.about.quickFacts.languages}</dd></div>
              </dl>
            </div>
            <div className="about-aside__quote card">
              <Icons.terminal size={16} />
              <p>{data.about.philosophy}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
