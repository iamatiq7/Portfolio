import { Icons } from './ui.jsx';

export default function Education({ data }) {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Education</p>
          <h2>Academic <span className="dim">foundation</span></h2>
        </div>

        <div className="edu-timeline">
          {data.education.map((e, i) => (
            <article className={`edu-item reveal ${i === 0 ? 'edu-item--primary' : ''}`} key={e.degree}>
              <div className="edu-item__marker" aria-hidden="true">
                <Icons.graduation size={16} />
              </div>
              <div className="edu-item__card card">
                <div className="edu-item__head">
                  <h3>{e.degree}</h3>
                  <span className="chip chip--enterprise">{e.period}</span>
                </div>
                <p className="edu-item__institution">{e.institution}</p>
                {e.result && <p className="edu-item__result">{e.result}</p>}
                {e.note && <p className="edu-item__note">{e.note}</p>}
              </div>
            </article>
          ))}
        </div>

        {data.futureFocus && (
          <div className="future-focus reveal">
            <div className="future-focus__icon">
              <Icons.shield size={22} />
            </div>
            <div>
              <h3>{data.futureFocus.title}</h3>
              <p>{data.futureFocus.intro}</p>
              <ul className="future-focus__badges">
                {data.futureFocus.items.map((item) => (
                  <li key={item}><span className="badge">{item}</span></li>
                ))}
              </ul>
              <p className="future-focus__note">{data.futureFocus.note}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
