import { Icons } from './ui.jsx';

export default function Experience({ data }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Professional Experience</p>
          <h2>Where I <span className="dim">work</span></h2>
          <p className="lede">
            Enterprise infrastructure operations at Bangladesh&apos;s leading enterprise technology
            services provider.
          </p>
        </div>

        <div className="timeline">
          {data.experience.map((job) => (
            <article className="timeline__item reveal" key={job.company}>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__card card">
                <div className="timeline__head">
                  <div>
                    <h3 className="timeline__role">{job.role}</h3>
                    <p className="timeline__company">
                      {job.company}
                      <span className="timeline__dept"> · {job.dept}</span>
                    </p>
                  </div>
                  <div className="timeline__meta">
                    <span className="chip chip--enterprise"><span className="dot" />{job.period}</span>
                    <span className="timeline__location">
                      <Icons.mapPin size={13} />
                      {job.location}
                    </span>
                  </div>
                </div>
                <p className="timeline__summary">{job.summary}</p>
                <ul className="timeline__duties">
                  {job.responsibilities.map((r) => (
                    <li key={r}>
                      <Icons.check size={14} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
